import { createClient } from '@supabase/supabase-js';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { SESClient } from '@aws-sdk/client-ses';
import type { SQSHandler, SQSEvent } from 'aws-lambda';
import {
	createNotificationHandler,
	createReminderNotificationStateStore,
} from './notification';
import { createReminderStore } from './reminder';
import { getUserProfile } from './user';
import { createEmailSender } from './email';

const { env } = process;
const serviceRole = env.SUPABASE_SERVICE_ROLE as string;
const supabaseUrl = env.SUPABASE_URL as string;
const reminderTable = env.SUPABASE_REMINDER_TABLE as string;
const reminderNotificationStateTable =
	env.DYNAMO_NOTIFICATION_STATE_TABLE as string;
const notificationsFromAddress = env.NOTIFICATIONS_FROM_ADDRESS as string;
const supabase = createClient(supabaseUrl, serviceRole);
const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient());
const ses = new SESClient();

export const handler: SQSHandler = async (event: SQSEvent): Promise<void> => {
	const reminderNotificationStateStore = createReminderNotificationStateStore(
		dynamo,
		{ reminderNotificationStateTable }
	);
	const reminderStore = createReminderStore(supabase, { reminderTable });
	const emailSender = createEmailSender(ses, {
		fromAddress: notificationsFromAddress,
	});
	const notificationHandler = createNotificationHandler(
		emailSender,
		reminderNotificationStateStore,
		reminderStore
	);
	const userProfile = getUserProfile(event);

	await notificationHandler.handleNotifications(userProfile);
};
