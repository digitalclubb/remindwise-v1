import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { updatePasswordSchema } from '../schema';
import { message, superValidate } from 'sveltekit-superforms/server';

export const load: PageServerLoad = async () => {
	const form = await superValidate(updatePasswordSchema);

	return {
		form,
	};
};

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, updatePasswordSchema);
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
