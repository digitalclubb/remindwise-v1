import { SupabaseClient } from '@supabase/supabase-js';
import type { UserProfileRecord } from '../types';

export interface UserProfileStore {
	getAllUsers: () => Promise<Array<UserProfileRecord>>;
}

export type UserProfileStoreOptions = {
	userProfileTable: string;
};

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

export type TestUserProfileStoreOptions = UserProfileStoreOptions & {
	testUsers: Array<string>;
};

export const createTestUserProfileStore = (
	supabaseClient: SupabaseClient,
	options: TestUserProfileStoreOptions
): UserProfileStore => {
	return {
		getAllUsers: async (): Promise<Array<UserProfileRecord>> => {
			const { data } = await supabaseClient
				.from(options.userProfileTable)
				.select()
				.in('email', options.testUsers);
			const users = data || [];

			for (const user of users) {
				user.updated_at = user.updated_at && new Date(user.updated_at);
			}

			return users;
		},
	};
};
