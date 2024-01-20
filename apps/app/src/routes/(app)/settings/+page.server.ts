import { getSettingsStore, updateSettingsStore } from '$houdini';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { settingsSchema } from './schema';
import type { Currency, Interval } from '@graphql/types';

export const load: PageServerLoad = async (event) => {
	const getSettings = new getSettingsStore();
	const { data } = await getSettings.fetch({
		event,
	});
	const settings = data?.settings?.list[0].setting;

	const form = await superValidate(
		{
			firstName: settings?.first_name || undefined,
			lastName: settings?.last_name || undefined,
			email: settings?.email || undefined,
			interval: settings?.interval as Interval,
			currency: settings?.currency as Currency,
			noticePeriod: settings?.notice_period ?? undefined,
			id: settings?.id,
		},
		settingsSchema
	);

	return {
		form,
	};
};

export const actions = {
	updateSettings: async (event) => {
		const formData = await event.request.formData();
		const form = await superValidate(formData, settingsSchema);
		const { valid, data } = form;

		if (!valid) {
			return fail(400, { form });
		}

		const updateSettings = new updateSettingsStore();
		await updateSettings.mutate(
			{
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				id: data.id,
				noticePeriod: data.noticePeriod,
				interval: data.interval,
				currency: data.currency,
			},
			{ event }
		);

		const { error } = await event.locals.supabase.auth.updateUser({
			email: data.email,
		});

		if (error) {
			console.log('error', error);
		}

		throw redirect(303, '/');
	},
};
