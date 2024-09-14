import { SupabaseClient } from '@supabase/supabase-js';
import type { UserProfileRecord } from '../types';

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

			return data || [];
		},
	};
};
