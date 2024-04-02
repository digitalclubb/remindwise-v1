import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms/server';
import { loginSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({ url, locals: { getSession } }) => {
	const session = await getSession();

	// Logged in users go to app
	if (session) {
		throw redirect(303, '/');
	}

	const form = await superValidate(zod(loginSchema));

	return { url: url.origin, form };
};

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const form = await superValidate(request, zod(loginSchema));
		const { valid, data } = form;

		if (!valid) {
			return fail(400, { form });
		}

		const { error } = await supabase.auth.signInWithPassword({
			email: data.email,
			password: data.password,
		});

		if (error) {
			return message(form, error.message, {
				status: 400,
			});
		}

		return message(form, 'Login successful');
	},
};
