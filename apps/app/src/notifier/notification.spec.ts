import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type {
	ReminderNotificationStateStore,
	ReminderNotificationState,
} from './notification';
import { createNotificationHandler } from './notification';
import { Currency, Frequency, Interval, Type } from '@graphql/types';
import type { ReminderRecord, UserProfileRecord } from '../types';
import type { EmailSender } from './email';
import type { ReminderStore } from './reminder';

type Mocks = {
	reminderNotificationStateStore: ReminderNotificationStateStore;
	reminderStore: ReminderStore;
	emailSender: EmailSender;
};

const getMocks = (): Mocks => {
	const reminderNotificationStateStore: ReminderNotificationStateStore = {
		getReminderNotificationState: async (userId) => ({
			userId: '123',
			checkpoints: [],
		}),
		upsertReminderNotificationState: async (notificationState) => {},
	};
	const reminderStore: ReminderStore = {
		getRecurringReminders: async (userId) => [],
	};
	const emailSender: EmailSender = {
		sendEmail: async () => {},
	};

	return {
		reminderNotificationStateStore,
		reminderStore,
		emailSender,
	};
};

type DueRemindersTestData = {
	fromDate: Date;
	userProfile: UserProfileRecord;
	reminders: Array<ReminderRecord>;
	notificationState: ReminderNotificationState | null;
	expectedMessage: string;
	expectedNotificationState: ReminderNotificationState;
};

type DueRemindersTestCase = {
	description: string;
	data: DueRemindersTestData;
};

describe('notifier', async () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it.for<DueRemindersTestCase>([
		{
			description:
				'should send notification & update state when monthly & annual reminders renew this month and are within the notice period',
			data: {
				fromDate: new Date('2024-09-10T09:00:00.000Z'),
				reminders: [
					{
						id: '123',
						created_at: new Date('2024-09-15T09:00:00.000Z'),
						started_at: new Date('2024-09-15T09:00:00.000Z'),
						company: 'me',
						cost: 11,
						user_id: '123',
						category_id: '123',
						notes: 't',
						name: 'mochi',
						type: Type.Ongoing,
						frequency: Frequency.Monthly,
						auto_renewal: true,
					},
					{
						id: '124',
						created_at: new Date('2023-09-10T09:00:00.000Z'),
						started_at: new Date('2023-09-12T09:00:00.000Z'),
						company: 'me',
						cost: 9,
						user_id: '123',
						category_id: '123',
						notes: 't',
						name: 'dorayaki',
						type: Type.Ongoing,
						frequency: Frequency.Monthly,
						auto_renewal: true,
					},
					{
						id: '125',
						created_at: new Date('2023-09-01T09:00:00.000Z'),
						started_at: new Date('2023-09-02T09:00:00.000Z'),
						company: 'me',
						cost: 9,
						user_id: '123',
						category_id: '123',
						notes: 't',
						name: 'dorayaki',
						type: Type.Ongoing,
						frequency: Frequency.Monthly,
						auto_renewal: true,
					},
				],
				userProfile: {
					id: '123',
					updated_at: new Date('2024-09-10T09:00:00.000Z'),
					first_name: 'test',
					last_name: 'user',
					email: 'test@example.com',
					currency: Currency.Gbp,
					notice_period: 7,
					interval: Interval.Days,
				},
				expectedMessage:
					'A payment of 11 GBP for mochi is due in 5 days on Sun Sep 15 2024.\nA payment of 9 GBP for dorayaki is due in 2 days on Thu Sep 12 2024.\n',
				notificationState: {
					userId: '123',
					checkpoints: [
						{
							reminderId: '125',
							lastNotified: '2024-08-25T09:00:00.000Z',
						},
					],
				},
				expectedNotificationState: {
					userId: '123',
					checkpoints: [
						{
							reminderId: '125',
							lastNotified: '2024-08-25T09:00:00.000Z',
						},
						{
							reminderId: '123',
							lastNotified: '2024-09-10T09:00:00.000Z',
						},
						{
							reminderId: '124',
							lastNotified: '2024-09-10T09:00:00.000Z',
						},
					],
				},
			},
		},
		{
			description:
				'should send notification & create state when monthly reminder renews next month and is within the notice period',
			data: {
				fromDate: new Date('2024-09-25T09:00:00.000Z'),
				reminders: [
					{
						id: '123',
						created_at: new Date('2024-05-15T09:00:00.000Z'),
						started_at: new Date('2024-07-05T09:00:00.000Z'),
						company: 'me',
						cost: 11,
						user_id: '123',
						category_id: '123',
						notes: 't',
						name: 'mochi',
						type: Type.Ongoing,
						frequency: Frequency.Monthly,
						auto_renewal: true,
					},
				],
				userProfile: {
					id: '123',
					updated_at: new Date('2024-09-05T09:00:00.000Z'),
					first_name: 'test',
					last_name: 'user',
					email: 'test@example.com',
					currency: Currency.Cad,
					notice_period: 10,
					interval: Interval.Days,
				},
				expectedMessage:
					'A payment of 11 CAD for mochi is due in 10 days on Sat Oct 05 2024.\n',
				notificationState: null,
				expectedNotificationState: {
					userId: '123',
					checkpoints: [
						{
							reminderId: '123',
							lastNotified: '2024-09-25T09:00:00.000Z',
						},
					],
				},
			},
		},
		{
			description:
				'should send notification & create state when annual reminder renews next year and is within the notice period',
			data: {
				fromDate: new Date('2024-12-20T10:00:00.000Z'),
				reminders: [
					{
						id: '123',
						created_at: new Date('2023-01-01T09:00:00.000Z'),
						started_at: new Date('2023-01-03T09:00:00.000Z'),
						company: 'me',
						cost: 11,
						user_id: '123',
						category_id: '123',
						notes: 't',
						name: 'mochi',
						type: Type.Ongoing,
						frequency: Frequency.Annual,
						auto_renewal: true,
					},
				],
				userProfile: {
					id: '123',
					updated_at: new Date('2024-09-10T09:00:00.000Z'),
					first_name: 'test',
					last_name: 'user',
					email: 'test@example.com',
					currency: Currency.Cad,
					notice_period: 14,
					interval: Interval.Days,
				},
				expectedMessage:
					'A payment of 11 CAD for mochi is due in 14 days on Fri Jan 03 2025.\n',
				notificationState: null,
				expectedNotificationState: {
					userId: '123',
					checkpoints: [
						{
							reminderId: '123',
							lastNotified: '2024-12-20T10:00:00.000Z',
						},
					],
				},
			},
		},
	])('$description', async ({ description, data }) => {
		const { emailSender, reminderNotificationStateStore, reminderStore } =
			getMocks();
		const handler = createNotificationHandler(
			emailSender,
			reminderNotificationStateStore,
			reminderStore
		);
		const sendEmailSpy = vi.spyOn(emailSender, 'sendEmail');
		const getRecurringRemindersSpy = vi.spyOn(
			reminderStore,
			'getRecurringReminders'
		);
		const getNotificationStateSpy = vi.spyOn(
			reminderNotificationStateStore,
			'getReminderNotificationState'
		);
		const upsertNotificationStateSpy = vi.spyOn(
			reminderNotificationStateStore,
			'upsertReminderNotificationState'
		);

		getRecurringRemindersSpy.mockImplementation(
			async (userId) => data.reminders
		);
		getNotificationStateSpy.mockImplementation(
			async (userId) => data.notificationState
		);

		vi.setSystemTime(data.fromDate);

		await handler.handleNotifications(data.userProfile);

		expect(sendEmailSpy).toHaveBeenCalledOnce();
		expect(sendEmailSpy).toHaveBeenCalledWith({
			recipients: [data.userProfile.email],
			message: data.expectedMessage,
		});
		expect(upsertNotificationStateSpy).toHaveBeenCalledOnce();
		expect(upsertNotificationStateSpy).toHaveBeenCalledWith(
			data.expectedNotificationState
		);
	});

	it('should not send notification or update state when no reminders due', async () => {
		const userProfile = {
			id: '123',
			updated_at: new Date('2024-09-10T09:00:00.000Z'),
			first_name: 'test',
			last_name: 'user',
			email: 'test@example.com',
			currency: Currency.Cad,
			notice_period: 5,
			interval: Interval.Days,
		};
		const remindersThatAreNotDue = [
			{
				id: '123',
				created_at: new Date('2024-09-15T09:00:00.000Z'),
				started_at: new Date('2024-05-26T09:00:00.000Z'),
				company: 'me',
				cost: 11,
				user_id: '123',
				category_id: '123',
				notes: 't',
				name: 'mochi',
				type: Type.Ongoing,
				frequency: Frequency.Monthly,
				auto_renewal: true,
			},
			{
				id: '124',
				created_at: new Date('2024-05-10T09:00:00.000Z'),
				started_at: new Date('2023-06-26T09:00:00.000Z'),
				company: 'me',
				cost: 9,
				user_id: '123',
				category_id: '123',
				notes: 't',
				name: 'dorayaki',
				type: Type.Ongoing,
				frequency: Frequency.Annual,
				auto_renewal: true,
			},
		];
		const fromDate = new Date('2024-06-20T10:00:00.000Z');
		const { emailSender, reminderNotificationStateStore, reminderStore } =
			getMocks();
		const handler = createNotificationHandler(
			emailSender,
			reminderNotificationStateStore,
			reminderStore
		);
		const sendEmailSpy = vi.spyOn(emailSender, 'sendEmail');
		const getRecurringRemindersSpy = vi.spyOn(
			reminderStore,
			'getRecurringReminders'
		);
		const upsertNotificationStateSpy = vi.spyOn(
			reminderNotificationStateStore,
			'upsertReminderNotificationState'
		);

		getRecurringRemindersSpy.mockImplementation(
			async (userId) => remindersThatAreNotDue
		);

		vi.setSystemTime(fromDate);

		await handler.handleNotifications(userProfile);

		expect(sendEmailSpy).not.toBeCalled();
		expect(upsertNotificationStateSpy).not.toBeCalled();
	});

	it('should not send notification or update state when user has no reminders', async () => {
		const userProfile = {
			id: '123',
			updated_at: new Date('2024-09-10T09:00:00.000Z'),
			first_name: 'test',
			last_name: 'user',
			email: 'test@example.com',
			currency: Currency.Cad,
			notice_period: 14,
			interval: Interval.Days,
		};
		const { emailSender, reminderNotificationStateStore, reminderStore } =
			getMocks();
		const handler = createNotificationHandler(
			emailSender,
			reminderNotificationStateStore,
			reminderStore
		);
		const sendEmailSpy = vi.spyOn(emailSender, 'sendEmail');
		const getRecurringRemindersSpy = vi.spyOn(
			reminderStore,
			'getRecurringReminders'
		);
		const upsertNotificationStateSpy = vi.spyOn(
			reminderNotificationStateStore,
			'upsertReminderNotificationState'
		);

		getRecurringRemindersSpy.mockImplementation(async (userId) => []);

		await handler.handleNotifications(userProfile);

		expect(sendEmailSpy).not.toBeCalled();
		expect(upsertNotificationStateSpy).not.toBeCalled();
	});

	it('should not update state when reminders due & notification fails to send', async () => {
		const userProfile = {
			id: '123',
			updated_at: new Date('2024-09-10T09:00:00.000Z'),
			first_name: 'test',
			last_name: 'user',
			email: 'test@example.com',
			currency: Currency.Cad,
			notice_period: 2,
			interval: Interval.Days,
		};
		const { emailSender, reminderNotificationStateStore, reminderStore } =
			getMocks();

		const handler = createNotificationHandler(
			emailSender,
			reminderNotificationStateStore,
			reminderStore
		);
		const dueReminders = [
			{
				id: '123',
				created_at: new Date('2024-01-15T09:00:00.000Z'),
				started_at: new Date('2024-05-12T09:00:00.000Z'),
				company: 'me',
				cost: 11,
				user_id: '123',
				category_id: '123',
				notes: 't',
				name: 'mochi',
				type: Type.Ongoing,
				frequency: Frequency.Monthly,
				auto_renewal: true,
			},
		];
		const fromDate = new Date('2024-01-10T10:00:00.000Z');
		const sendEmailSpy = vi.spyOn(emailSender, 'sendEmail');
		const getRecurringRemindersSpy = vi.spyOn(
			reminderStore,
			'getRecurringReminders'
		);
		const upsertNotificationStateSpy = vi.spyOn(
			reminderNotificationStateStore,
			'upsertReminderNotificationState'
		);

		getRecurringRemindersSpy.mockImplementation(async (userId) => dueReminders);
		sendEmailSpy.mockImplementation(async (request) => {
			throw new Error('email error');
		});

		vi.setSystemTime(fromDate);

		expect(handler.handleNotifications(userProfile)).rejects.toThrowError(
			'email error'
		);
		expect(upsertNotificationStateSpy).not.toBeCalled();
	});
});
