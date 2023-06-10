import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals: { getSession } }) => {
	const session = await getSession();

	// Logged in users go to app
	if (session) {
		throw redirect(303, '/');
	}

	return { url: url.origin };
};

export const actions = {
	default: async ({ request, url, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const options = { emailRedirectTo: `${url}/` };
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
			options,
		});

		if (error) {
			return fail(500, {
				message: 'Server error. Try again later.',
				success: false,
				email,
			});
		}

		return {
			message:
				'Please check your email for a magic link to log into the website.',
			success: true,
		};
	},
};
