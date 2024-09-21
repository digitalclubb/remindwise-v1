import { SupabaseClient } from '@supabase/supabase-js';
import type { UserProfileRecord } from '../../types';

export type UserProfileStoreOptions = {
	userProfileTable: string;
};

export interface UserProfileStore {
	getAllUsers: () => Promise<Array<UserProfileRecord>>;
}

export const createUserProfileStore = (
	supabaseClient: SupabaseClient,
	options: UserProfileStoreOptions
): UserProfileStore => {
	return {
		getAllUsers: async (): Promise<Array<UserProfileRecord>> => {
			const { data } = await supabaseClient
				.from(options.userProfileTable)
				.select('*');
			const users = data || [];

			for (const user of users) {
				user.updated_at = user.updated_at && new Date(user.updated_at);
			}

			return users;
		},
	};
};
