import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms/server';
import { forgotPasswordSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { getURL } from '../util';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(forgotPasswordSchema));

	return { form };
};

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const form = await superValidate(request, zod(forgotPasswordSchema));
		const { valid, data } = form;

		if (!valid) {
			return fail(400, { form });
		}

		const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
			redirectTo: `${getURL()}auth/callback?goto=/update-password`,
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
