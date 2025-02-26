import { Frequency, Type, OperationType, type History } from '@graphql/types';
import { differenceInMonths, differenceInYears, isAfter } from 'date-fns';

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

const formatPrice = (price: number) => {
	return parseInt((+price).toFixed(2));
};

export type GraphData = {
	totalMonthCosts: Map<string, number>;
	nextYearCosts: Map<string, number>;
	perCategoryCosts: Map<string, Map<string, number>>;
	perCategoryNextYearCosts: Map<string, Map<string, number>>;
	perReminderAccrued: Map<string, number>;
};

type AggregateData = {
	monthCosts: Map<string, number>;
	reminderId: string;
	categoryId: string;
	previousDate: Date;
	previousCost: number;
	totalAccrued: number;
	autoRenewal?: boolean;
};

const reduceReminderHistory = (
	reminder: ReminderHistoryRecord,
	year: number,
	aggregateData: AggregateData
) => {
	const cost = reminder.cost;
	aggregateData.categoryId = reminder.category_id;
	aggregateData.autoRenewal = reminder.auto_renewal;
	const isEventAfterStartDate =
		reminder.operation_type === OperationType.ReminderUpdated &&
		reminder.created_at.getTime() >= reminder.started_at.getTime();
	const date = isEventAfterStartDate
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

		// If it's an updated event and the cost is different, then calculate the total accrued between created date and previous date
		// By using the number of months that separate the two dates
		if (
			reminder.operation_type === OperationType.ReminderUpdated &&
			isEventAfterStartDate
		) {
			const months = differenceInMonths(
				reminder.created_at,
				aggregateData.previousDate
			);
			if (aggregateData.autoRenewal) {
				aggregateData.totalAccrued += aggregateData.previousCost * months;
			} else {
				aggregateData.totalAccrued += aggregateData.previousCost * (months + 1);
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

		// If it's an updated event and the cost is different, then calculate the total accrued between created date and previous date
		// By using the number of years that separate the two dates
		if (
			reminder.operation_type === OperationType.ReminderUpdated &&
			isEventAfterStartDate
		) {
			const years = differenceInYears(
				reminder.created_at,
				aggregateData.previousDate
			);
			if (aggregateData.autoRenewal) {
				aggregateData.totalAccrued += aggregateData.previousCost * years;
			} else {
				aggregateData.totalAccrued += aggregateData.previousCost * (years + 1);
			}
		}
		// Is it single record and in the year it was started
	} else if (reminder.type === Type.Single && !isItFutureYear) {
		const month = reminder.month ?? 1;
		aggregateData?.monthCosts.set(month.toString(), cost);
	}

	if (reminder.type === Type.Single) {
		aggregateData.totalAccrued = reminder.cost;
	}

	if (reminder.operation_type !== OperationType.ReminderCreated) {
		aggregateData.previousDate = date;
		aggregateData.previousCost = aggregateData.autoRenewal ? reminder.cost : 0;
	}
};

export const calculateGraphData = (
	date: Date,
	sortedReminders: ReminderHistoryRecord[]
): GraphData => {
	const graphData: GraphData = {
		totalMonthCosts: getDateBuckets(),
		nextYearCosts: getDateBuckets(),
		perCategoryCosts: new Map(),
		perCategoryNextYearCosts: new Map(),
		perReminderAccrued: new Map(),
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
			previousCost: reminders[0].cost,
			previousDate: reminders[0].started_at,
			totalAccrued: 0,
		};
		// if it's deleted, do nothing
		if (
			reminders.some((r) => r.operation_type === OperationType.ReminderDeleted)
		) {
			break;
		}

		// reminder hasn't been updated at all, only created and nothing else happened
		for (let i = 0; i < reminders.length; i++) {
			// reduce all of that reminders events into an aggregation which represents the latest data
			reduceReminderHistory(reminders[i], date.getFullYear(), aggregateData);
		}

		// get the perCategory data if it exists, otherwise create a new months map
		const categoryData =
			graphData.perCategoryCosts.get(
				aggregateData.categoryId?.toString() ?? ''
			) ?? getDateBuckets();

		for (const [key, value] of aggregateData.monthCosts) {
			// Update the total months cost for that account
			graphData.totalMonthCosts.set(
				key,
				(formatPrice(graphData.totalMonthCosts.get(key)!) ?? 0) + value
			);
			// Update the per category months cost for that account
			categoryData.set(key, (categoryData.get(key) ?? 0) + value);
		}

		// Update the category with the new category totals
		graphData.perCategoryCosts.set(
			aggregateData.categoryId?.toString() ?? '',
			categoryData
		);

		if (
			reminders[0].type === Type.Ongoing &&
			reminders[0].frequency === Frequency.Monthly &&
			isAfter(date, aggregateData.previousDate)
		) {
			const months = differenceInMonths(date, aggregateData.previousDate) + 1;
			aggregateData.totalAccrued += aggregateData.previousCost * months;
		} else if (
			reminders[0].type === Type.Ongoing &&
			reminders[0].frequency === Frequency.Annual &&
			isAfter(date, aggregateData.previousDate)
		) {
			const years = differenceInYears(date, aggregateData.previousDate) + 1;
			aggregateData.totalAccrued += aggregateData.previousCost * years;
		}

		const nextYearCategoryData =
			graphData.perCategoryNextYearCosts.get(
				aggregateData.categoryId?.toString() ?? ''
			) ?? getDateBuckets();

		if (
			reminders[0].type === Type.Ongoing &&
			reminders[0].frequency === Frequency.Monthly
		) {
			graphData.nextYearCosts.forEach((value, key, map) =>
				map.set(key, aggregateData.monthCosts.get('12')! + value)
			);
			nextYearCategoryData.forEach((_, key, map) =>
				map.set(key, categoryData.get('12')!)
			);
		} else if (
			reminders[0].type === Type.Ongoing &&
			reminders[0].frequency === Frequency.Annual
		) {
			graphData.nextYearCosts.forEach((value, key, map) =>
				map.set(key, aggregateData.monthCosts.get(key)! + value)
			);
			nextYearCategoryData.forEach((_, key, map) =>
				map.set(key, categoryData.get(key)!)
			);
		}

		// Update the category next year with the totals
		graphData.perCategoryNextYearCosts.set(
			aggregateData.categoryId?.toString() ?? '',
			nextYearCategoryData
		);

		graphData.perReminderAccrued.set(
			aggregateData.reminderId,
			aggregateData.totalAccrued
		);
	}

	return graphData;
};
