import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { updatePasswordSchema } from '../schema';
import { message, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(updatePasswordSchema));

	return {
		form,
	};
};

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const form = await superValidate(request, zod(updatePasswordSchema));
		const { valid, data } = form;

		if (!valid) {
			return fail(400, { form });
		}

		const { error } = await supabase.auth.updateUser({
			password: data.password,
		});

		if (error) {
			return message(form, error.message || 'Server error. Try again later.', {
				status: 400,
			});
		}

		return message(form, 'Password updated successfully.');
	},
};
