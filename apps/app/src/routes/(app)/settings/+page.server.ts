import { updateSettingsStore } from '$houdini';
import type { Currency, Interval } from '@graphql/types.js';
import { redirect } from '@sveltejs/kit';
export const actions = {
	updateSettings: async (event) => {
		const data = await event.request.formData();
		const firstName = data.get('firstName') as string;
		const lastName = data.get('lastName') as string;
		const email = data.get('email') as string;
		const id = data.get('id') as string;
		const noticePeriod = parseInt(data.get('notice-period') as string);
		const interval = data.get('interval') as Interval;
		const currency = data.get('currency') as Currency;

		const updateSettings = new updateSettingsStore();

		await updateSettings.mutate(
			{
				firstName,
				lastName,
				email,
				id,
				noticePeriod,
				interval,
				currency,
			},
			{ event }
		);

		const { error } = await event.locals.supabase.auth.updateUser({
			email,
		});

		if (error) {
			console.log('error', error);
		}

		throw redirect(303, '/');
	},
};
