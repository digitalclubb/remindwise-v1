import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms/server';
import { registerSchema } from './schema';

export const load: PageServerLoad = async ({ url, locals: { getSession } }) => {
	const session = await getSession();

	// Logged in users go to app
	if (session) {
		throw redirect(303, '/');
	}

	const form = await superValidate(registerSchema);

	return { url: url.origin, form };
};

export const actions = {
	default: async ({ request, url, locals: { supabase } }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, registerSchema);
		const { valid, data } = form;

		if (!valid) {
			return fail(400, { form });
		}

		const options = { emailRedirectTo: `${url.origin}/auth/callback` };
		const { error } = await supabase.auth.signUp({
			email: data.email,
			password: data.password,
			options,
		});

		if (error) {
			return message(form, error.message, {
				status: 400,
			});
		}

		return message(
			form,
			'Please check your email for a magic link to log into the website.'
		);
	},
};
