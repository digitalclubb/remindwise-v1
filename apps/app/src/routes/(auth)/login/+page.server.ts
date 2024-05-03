import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms/server';
import { loginSchema } from './schema';

export const load: PageServerLoad = async ({ url }) => {
	const form = await superValidate(loginSchema);

	return { url: url.origin, form };
};

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, loginSchema);
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
