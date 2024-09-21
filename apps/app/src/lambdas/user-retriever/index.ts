import { createClient } from '@supabase/supabase-js';
import type { Handler } from 'aws-lambda';
import { createUserProfileStore } from './user';
import type { UserProfileRecord } from '../../types';

const serviceRole = process.env.SUPABASE_SERVICE_ROLE as string;
const supabaseUrl = process.env.SUPABASE_URL as string;
const userProfileTable = process.env.SUPABASE_USER_PROFILE_TABLE as string;
const supabase = createClient(supabaseUrl, serviceRole);

export const handler: Handler = async (): Promise<Array<UserProfileRecord>> => {
	const userProfileStore = createUserProfileStore(supabase, {
		userProfileTable,
	});

	return await userProfileStore.getAllUsers();
};
