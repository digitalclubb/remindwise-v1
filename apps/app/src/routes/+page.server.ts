import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/login');
	}

	console.log('access token', session?.access_token);
	console.log('access token', session?.user);
	const { data: profile } = await supabase
		.from('profiles')
		.select(`username, fullname, email, telephone`)
		.eq('id', session?.user.id)
		.single();
	console.log('profile', profile);
	return { session, profile };
}) satisfies PageServerLoad;
