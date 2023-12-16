import { fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, cookies, fetch }) => {
		const data = await request.formData();
		const email = data.get('email') as string;

		// Compare current time with time of previous sign up
		const time = new Date();
		const timestamp = time.valueOf();
		const previousTimestamp = cookies.get('email-submitted');

		if (!email) {
			return fail(400, {
				email,
				error: true,
				message: 'Email field is required',
			});
		}

		// If last sign up was less than a minute ago rate limit
		if (previousTimestamp && Number(previousTimestamp) + 60000 > timestamp) {
			return fail(400, {
				email,
				error: true,
				message:
					'You have already submitted an email address. Please try again in a moment',
			});
		}
		cookies.set('email-submitted', timestamp.toString(), {
			path: '/',
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 30,
		});

		const formBody = 'userGroup=&email=' + encodeURIComponent(email);

		try {
			const result = await fetch(
				'https://app.loops.so/api/newsletter-form/clm501ypy00m6l70okps8iy80',
				{
					method: 'POST',
					body: formBody,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				}
			);

			if (!result.ok) {
				const data = await result.json();
				return {
					success: true,
					message: data.message ? data.message : result.statusText,
				};
			}
		} catch (e) {
			const error = e as Error;
			if (error.message === 'Failed to fetch') {
				return fail(400, {
					email,
					error: true,
					message:
						'You have already submitted an email address. Please try again in a moment',
				});
			}
			if (error.message) {
				return fail(400, { email, error: true, message: error.message });
			}
			cookies.delete('email-submitted', { path: '/' });
		}
		return { success: true };
	},
};
