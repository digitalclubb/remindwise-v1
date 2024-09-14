import { createClient } from '@supabase/supabase-js';
import type { Handler } from 'aws-lambda';
import type { UserProfileResponse } from '../types';
import { createUserProfileStore } from './user';

const serviceRole = process.env.SUPABASE_SERVICE_ROLE as string;
const supabaseUrl = process.env.SUPABASE_URL as string;
const userProfileTable = process.env.SUPABASE_USER_PROFILE_TABLE as string;
const supabase = createClient(supabaseUrl, serviceRole);

export const handler: Handler = async (
	event
): Promise<Array<UserProfileResponse>> => {
	const userProfileStore = createUserProfileStore(supabase, {
		userProfileTable,
	});
	return await userProfileStore.getAllUsers();
};
