import { SupabaseClient } from '@supabase/supabase-js';
import { Type } from '@graphql/types';
import type { ReminderRecord } from '../../types';

export type ReminderStoreOptions = {
	reminderTable: string;
};

export interface ReminderStore {
	getRecurringReminders: (userId: string) => Promise<Array<ReminderRecord>>;
}

export const createReminderStore = (
	supabaseClient: SupabaseClient,
	options: ReminderStoreOptions
): ReminderStore => {
	return {
		getRecurringReminders: async (
			userId: string
		): Promise<Array<ReminderRecord>> => {
			const { data } = await supabaseClient
				.from(options.reminderTable)
				.select('*')
				.eq('user_id', userId)
				.match({
					type: Type.Ongoing,
					auto_renewal: true,
				});
			const reminders = data || [];

			for (const reminder of reminders) {
				reminder.created_at =
					reminder.created_at && new Date(reminder.created_at);
				reminder.started_at =
					reminder.started_at && new Date(reminder.started_at);
			}

			return reminders;
		},
	};
};
