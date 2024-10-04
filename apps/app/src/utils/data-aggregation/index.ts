import { Frequency, Type, OperationType, type History } from '@graphql/types';

export type ReminderHistoryRecord = History;

const getDateBuckets = (): Map<string, number> => {
	return new Map([
		['1', 0],
		['2', 0],
		['3', 0],
		['4', 0],
		['5', 0],
		['6', 0],
		['6', 0],
		['7', 0],
		['8', 0],
		['9', 0],
		['10', 0],
		['11', 0],
		['12', 0],
	]);
};

type GraphData = {
	totalMonthCosts: Map<string, number>;
	perCategoryCosts: Map<string, Map<string, number>>;
	perReminderCosts: Map<string, number>;
};

type AggregateData = {
	monthCosts: Map<string, number>;
	reminderId: string;
	categoryId: string;
	autoRenewal?: boolean; //TODO what are we doing with this
	// A monthly reminder and I want to pause. That sets auto renewal to false. We don't keep track of values anymore. It's like deleted but keeping the data.
};

const reduceReminderHistory = (
	reminder: ReminderHistoryRecord,
	year: number,
	aggregateData: AggregateData
) => {
	const cost = reminder.cost;
	aggregateData.categoryId = reminder.category_id;
	aggregateData.autoRenewal = reminder.auto_renewal;
	const date =
		reminder.operation_type === OperationType.ReminderUpdated &&
		reminder.created_at.getTime() >= reminder.started_at.getTime()
			? reminder.created_at
			: reminder.started_at;

	// Is the year we're requesting the graphs for in a following year to when it was started?
	const isItFutureYear = year > date.getFullYear();
	// Is it ongoing and monthly
	if (
		reminder.type === Type.Ongoing &&
		reminder.frequency === Frequency.Monthly
	) {
		// If we're requesting the graph data in the same year the reminder was started, then use it's month
		// If it's a future year, set the data from the first month of the year
		const initialMonth = isItFutureYear ? 1 : date.getMonth() + 1;
		// If auto renewal is off then we have an end month
		const endMonth = reminder.auto_renewal ? 13 : date.getMonth() + 1;

		for (let i = initialMonth; i < 13; i++) {
			// if current month is greater than end month or autoRenewal is off and it's a future year
			// set that month cost to 0
			if (i > endMonth || (!reminder.auto_renewal && isItFutureYear)) {
				aggregateData?.monthCosts.set(i.toString(), 0);
			} else {
				// otherwise set it to the reminder current cost
				aggregateData?.monthCosts.set(i.toString(), cost);
			}
		}
		// Is it ongoing and yearly
	} else if (
		reminder.type === Type.Ongoing &&
		reminder.frequency === Frequency.Annual
	) {
		const month = reminder.month ?? 1;
		// Is it an auto renewing reminder and the year it happened is less or equal to the requested year
		// set that month cost to the reminder current cost
		if (date.getFullYear() <= year && reminder.auto_renewal) {
			aggregateData?.monthCosts.set(month.toString(), cost);
		} else if (
			// Is it a future year and not auto renewing
			(isItFutureYear && !reminder.auto_renewal) ||
			// Or not auto renewing and the current month is before the reminder month
			(!reminder.auto_renewal && date.getMonth() + 1 <= month)
		) {
			// set that month cost to 0
			aggregateData?.monthCosts.set(month.toString(), 0);
		}
		// Is it single record and in the year it was started
	} else if (reminder.type === Type.Single && !isItFutureYear) {
		const month = reminder.month ?? 1;
		aggregateData?.monthCosts.set(month.toString(), cost);
	}
};

export const calculateGraphData = (
	year: number,
	sortedReminders: ReminderHistoryRecord[]
): GraphData => {
	const graphData: GraphData = {
		totalMonthCosts: getDateBuckets(),
		perCategoryCosts: new Map(),
		perReminderCosts: new Map(),
	};
	const bucketedReminders = new Map<string, ReminderHistoryRecord[]>();

	// creating map of reminder events by reminder id
	for (const reminder of sortedReminders) {
		const reminders = bucketedReminders.get(reminder.reminder_id);
		if (reminders) {
			reminders.push(reminder);
			continue;
		}
		bucketedReminders.set(reminder.reminder_id, [reminder]);
	}

	for (const [, reminders] of bucketedReminders) {
		const aggregateData: AggregateData = {
			monthCosts: getDateBuckets(),
			categoryId: reminders[0].category_id,
			reminderId: reminders[0].reminder_id,
			autoRenewal: reminders[0].auto_renewal,
		};
		// reminder hasn't been updated at all, only created and nothing else happened
		for (let i = 0; i < reminders.length; i++) {
			if (
				reminders.some(
					(r) => r.operation_type === OperationType.ReminderDeleted
				)
			)
				break;

			// reduce all of that reminders events into an aggregation which represents the latest data
			reduceReminderHistory(reminders[i], year, aggregateData);
		}
		// get the perCategory data if it exists, otherwise create a new months map
		const categoryData =
			graphData.perCategoryCosts.get(
				aggregateData.categoryId?.toString() ?? ''
			) ?? getDateBuckets();

		let total = 0;
		for (const [key, value] of aggregateData.monthCosts) {
			// Update the total months cost for that account
			graphData.totalMonthCosts.set(
				key,
				(graphData.totalMonthCosts.get(key) ?? 0) + value
			);

			total += value;
			// Update the per category months cost for that account
			categoryData.set(key, (categoryData.get(key) ?? 0) + value);
		}

		// Update the category with the new category totals
		graphData.perCategoryCosts.set(
			aggregateData.categoryId?.toString() ?? '',
			categoryData
		);

		// TODO add tests, also this is wrong as it's the whole total
		// we only want current total
		// graphData.perReminderCosts.set(aggregateData.reminderId, total);
	}

	return graphData;
};
