import {
	DynamoDBDocumentClient,
	GetCommand,
	PutCommand,
} from '@aws-sdk/lib-dynamodb';
import {
	add,
	sub,
	differenceInCalendarDays,
	isAfter,
	isWithinInterval,
} from 'date-fns';
import { Currency, Frequency } from '@graphql/types';
import type { ReminderRecord, UserProfileRecord } from '../types';
import type { ReminderStore } from './reminder';
import type { EmailSender } from './email';

export type ReminderNotificationCheckpoint = {
	reminderId: string;
	lastNotified: string;
};

export type ReminderNotificationState = {
	userId: string;
	checkpoints: Array<ReminderNotificationCheckpoint>;
};

export type ReminderNotificationStateStoreOptions = {
	reminderNotificationStateTable: string;
};

export interface ReminderNotificationStateStore {
	getReminderNotificationState: (
		userId: string
	) => Promise<ReminderNotificationState | null>;
	upsertReminderNotificationState: (
		reminderNotificationState: ReminderNotificationState
	) => Promise<void>;
}

type DueReminderDetails = {
	id: string;
	name: string;
	cost: number;
	noticePeriodInDays: number;
	daysUntilRenewal: number;
	renewalDate: Date;
};

const getDueReminders = (
	checkpointsByReminderId: Map<string, ReminderNotificationCheckpoint>,
	reminders: Array<ReminderRecord>,
	noticePeriodInDays: number,
	fromDate: Date
): Array<DueReminderDetails> => {
	const dueReminders: Array<DueReminderDetails> = [];

	for (const reminder of reminders) {
		const { id, name, cost } = reminder;
		const renewalDate = getRenewalDate(reminder, fromDate);
		if (!renewalDate) {
			continue;
		}

		const daysUntilRenewal = differenceInCalendarDays(renewalDate, fromDate);
		if (outsideNotificationWindow(daysUntilRenewal, noticePeriodInDays)) {
			continue;
		}

		const reminderNotificationCheckpoint = checkpointsByReminderId.get(
			reminder.id
		);
		const lastNotifiedDate = reminderNotificationCheckpoint?.lastNotified
			? new Date(reminderNotificationCheckpoint.lastNotified)
			: null;
		if (
			lastNotifiedDate &&
			notifiedWithinNoticePeriod(
				fromDate,
				lastNotifiedDate,
				renewalDate,
				noticePeriodInDays
			)
		) {
			continue;
		}

		dueReminders.push({
			id,
			name,
			cost,
			noticePeriodInDays,
			daysUntilRenewal,
			renewalDate,
		});
	}

	return dueReminders;
};

export const createReminderNotificationStateStore = (
	dynamoDocClient: DynamoDBDocumentClient,
	options: ReminderNotificationStateStoreOptions
): ReminderNotificationStateStore => {
	return {
		getReminderNotificationState: async (
			userId: string
		): Promise<ReminderNotificationState | null> => {
			const params = {
				TableName: options.reminderNotificationStateTable,
				Key: {
					userId,
				},
			};
			const command = new GetCommand(params);
			const output = await dynamoDocClient.send(command);
			if (output.Item) {
				return output.Item as ReminderNotificationState;
			}

			return null;
		},
		upsertReminderNotificationState: async (
			reminderNotificationState: ReminderNotificationState
		): Promise<void> => {
			const params = {
				TableName: options.reminderNotificationStateTable,
				Item: reminderNotificationState,
			};
			const command = new PutCommand(params);

			await dynamoDocClient.send(command);
		},
	};
};

export const getRenewalDate = (
	reminder: ReminderRecord,
	today: Date
): Date | null => {
	const reminderDay = (reminder.started_at as Date).getUTCDate();
	const reminderMonth = (reminder.started_at as Date).getUTCMonth();
	const currentYear = today.getUTCFullYear();
	const currentMonth = today.getUTCMonth();

	if (reminder.frequency === Frequency.Monthly) {
		let monthlyRenewalDate = new Date(
			Date.UTC(currentYear, currentMonth, reminderDay)
		);
		if (isAfter(today, monthlyRenewalDate)) {
			monthlyRenewalDate = add(monthlyRenewalDate, { months: 1 });
		}

		return monthlyRenewalDate;
	}

	if (reminder.frequency === Frequency.Annual) {
		let yearlyRenewalDate = new Date(
			Date.UTC(currentYear, reminderMonth, reminderDay)
		);
		if (isAfter(today, yearlyRenewalDate)) {
			yearlyRenewalDate = add(yearlyRenewalDate, { years: 1 });
		}

		return yearlyRenewalDate;
	}

	return null;
};

const getCheckpointsByReminderId = (
	reminderNotificationState: ReminderNotificationState
): Map<string, ReminderNotificationCheckpoint> => {
	const { checkpoints } = reminderNotificationState;
	const checkpointsByReminderId: Map<string, ReminderNotificationCheckpoint> =
		new Map<string, ReminderNotificationCheckpoint>();

	checkpoints.forEach((n) => {
		checkpointsByReminderId.set(n.reminderId, n);
	});

	return checkpointsByReminderId;
};

const notifiedWithinNoticePeriod = (
	fromDate: Date,
	lastNotified: Date,
	renewalDate: Date,
	noticePeriodInDays: number
): boolean => {
	return (
		isAfter(lastNotified, fromDate) ||
		isWithinInterval(lastNotified, {
			start: sub(renewalDate, { days: noticePeriodInDays }),
			end: renewalDate,
		})
	);
};

const outsideNotificationWindow = (
	daysUntilRenewal: number,
	noticePeriodInDays: number
): boolean => daysUntilRenewal <= 0 || daysUntilRenewal > noticePeriodInDays;

const getUpdatedCheckpoints = (
	checkpointsByReminderId: Map<string, ReminderNotificationCheckpoint>,
	dueReminders: Array<DueReminderDetails>,
	lastNotified: Date
): Array<ReminderNotificationCheckpoint> => {
	for (const dueReminder of dueReminders) {
		const { id } = dueReminder;
		checkpointsByReminderId.set(id, {
			reminderId: id,
			lastNotified: lastNotified.toISOString(),
		});
	}
	const updatedCheckpoints = Array.from(checkpointsByReminderId.values());

	return updatedCheckpoints;
};

const getReminderNotificationMessage = (
	dueReminders: Array<DueReminderDetails>,
	currency: Currency
): string =>
	dueReminders.reduce((message, dueReminder) => {
		const { cost, name, daysUntilRenewal, renewalDate } = dueReminder;
		const daysUntilRenewalString = `${daysUntilRenewal} ${dueReminder.daysUntilRenewal > 1 ? 'days' : 'day'}`;

		return (
			message +
			`A payment of ${cost} ${currency} for ${name} is due in ${daysUntilRenewalString} on ${renewalDate.toDateString()}.\n`
		);
	}, '');

export interface NotificationHandler {
	handleNotifications(userProfile: UserProfileRecord): Promise<void>;
}

export const createNotificationHandler = (
	emailSender: EmailSender,
	reminderNotificationStateStore: ReminderNotificationStateStore,
	reminderStore: ReminderStore
): NotificationHandler => {
	return {
		handleNotifications: async (
			userProfile: UserProfileRecord
		): Promise<void> => {
			const today = new Date();
			const { id, email, notice_period } = userProfile;
			const reminders = await reminderStore.getRecurringReminders(id);
			if (!reminders.length) {
				return;
			}

			const reminderNotificationState =
				(await reminderNotificationStateStore.getReminderNotificationState(
					id
				)) ?? {
					userId: id,
					checkpoints: [],
				};
			const checkpointsByReminderId = getCheckpointsByReminderId(
				reminderNotificationState
			);
			const defaultNoticePeriodInDays = 2;
			const noticePeriodInDays = notice_period ?? defaultNoticePeriodInDays;
			const dueReminders = getDueReminders(
				checkpointsByReminderId,
				reminders,
				noticePeriodInDays,
				today
			);
			if (!dueReminders.length) {
				return;
			}

			const message = getReminderNotificationMessage(
				dueReminders,
				userProfile.currency as Currency
			);

			await emailSender.sendEmail({
				recipients: [email as string],
				subject: 'Upcoming payments',
				message,
			});

			const updatedCheckpoints = getUpdatedCheckpoints(
				checkpointsByReminderId,
				dueReminders,
				today
			);

			reminderNotificationState.checkpoints = updatedCheckpoints;

			await reminderNotificationStateStore.upsertReminderNotificationState(
				reminderNotificationState
			);
		},
	};
};
