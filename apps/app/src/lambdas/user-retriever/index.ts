import { createClient } from '@supabase/supabase-js';
import type { Handler } from 'aws-lambda';
import { createUserProfileStore, createTestUserProfileStore } from './user';
import { Environment, type UserProfileRecord } from '../types';

const stage = process.env.STAGE as string;
const testUsers = (process.env.TEST_USERS as string)
	.split(',')
	.map((u) => u.trim());
const serviceRole = process.env.SUPABASE_SERVICE_ROLE as string;
const supabaseUrl = process.env.SUPABASE_URL as string;
const userProfileTable = process.env.SUPABASE_USER_PROFILE_TABLE as string;
const supabase = createClient(supabaseUrl, serviceRole);

export const handler: Handler = async (): Promise<Array<UserProfileRecord>> => {
	const userProfileStore =
		stage === Environment.Prod
			? createUserProfileStore(supabase, {
					userProfileTable,
				})
			: createTestUserProfileStore(supabase, { userProfileTable, testUsers });

	return await userProfileStore.getAllUsers();
};
