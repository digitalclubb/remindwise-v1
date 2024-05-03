import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms/server';
import { forgotPasswordSchema } from './schema';

export const load: PageServerLoad = async ({ url }) => {
	const form = await superValidate(forgotPasswordSchema);

	return { url: url.origin, form };
};

export const actions = {
	default: async ({ request, url, locals: { supabase } }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, forgotPasswordSchema);
		const { valid, data } = form;

		if (!valid) {
			return fail(400, { form });
		}

		const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
			redirectTo: `${url.origin}/auth/callback?goto=/update-password`,
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
