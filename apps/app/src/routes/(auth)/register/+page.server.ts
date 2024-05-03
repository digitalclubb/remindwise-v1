import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms/server';
import { registerSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({ url }) => {
	const form = await superValidate(zod(registerSchema));

	return { url: url.origin, form };
};

export const actions: Actions = {
	default: async ({ request, url, locals: { supabase } }) => {
		const form = await superValidate(request, zod(registerSchema));
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
