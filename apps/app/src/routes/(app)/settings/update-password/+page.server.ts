import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const password = formData.get('password') as string;

		const { error } = await supabase.auth.updateUser({ password });

		if (error) {
			return fail(500, {
				message: error.message || 'Server error. Try again later.',
				error: true,
			});
		}

		return {
			message: 'Password updated successfully.',
			success: true,
		};
	},
};
