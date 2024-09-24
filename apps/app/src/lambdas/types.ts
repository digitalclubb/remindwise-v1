import type { Reminder, Settings } from '@graphql/types'

export type ReminderRecord = Pick<Reminder, 'auto_renewal' | 'category' | 'category_id' | 'company' | 'cost' | 'created_at' | 'frequency' | 'id' | 'name' | 'notes' | 'started_at' | 'type' | 'user_id'>;

export type UserProfileRecord = Pick<Settings, 'currency' | 'email' | 'first_name' | 'id' | 'interval' | 'last_name' | 'notice_period' | 'updated_at'>;
