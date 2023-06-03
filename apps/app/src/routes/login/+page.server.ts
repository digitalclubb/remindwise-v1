import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals: { getSession } }) => {
	const session = await getSession();

	// Logged in users go to app
	if (session) {
		throw redirect(303, '/');
	}

	return { url: url.origin };
};
