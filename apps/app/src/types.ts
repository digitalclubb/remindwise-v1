import type { Maybe, Reminder, Settings } from '@graphql/types'

export type ReminderRecord = Pick<Reminder, 'auto_renewal' | 'category' | 'category_id' | 'company' | 'cost' | 'created_at' | 'frequency' | 'id' | 'name' | 'notes' | 'started_at' | 'type' | 'user_id'>;

export type UserProfileRecord = Pick<Settings, 'currency' | 'email' | 'first_name' | 'id' | 'interval' | 'last_name' | 'notice_period' | 'updated_at'>;

export type UserProfileResponse = {
    id: string;
    currency?: Maybe<string>;
    email?: Maybe<string>;
    first_name?: Maybe<string>;
    interval?: Maybe<string>;
    last_name?: Maybe<string>;
    notice_period?: Maybe<number>;
    updated_at?: Maybe<string>;
  };
  