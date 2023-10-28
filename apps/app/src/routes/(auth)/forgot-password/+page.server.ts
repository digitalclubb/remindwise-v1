import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, url, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;

		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${url.origin}/auth/callback?next=/update-password`,
		});

		if (error) {
			return fail(500, {
				message: error.message || 'Server error. Try again later.',
				error: true,
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
