import { getSettingsStore, updateSettingsStore } from '$houdini';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { settingsSchema } from './schema';
import type { Currency, Interval } from '@graphql/types';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async (event) => {
	const getSettings = new getSettingsStore();
	const { data } = await getSettings.fetch({
		event,
	});
	const settings = data?.settings?.list[0].setting;

	const form = await superValidate(
		zod(settingsSchema, {
			defaults: {
				firstName: settings?.first_name || '',
				lastName: settings?.last_name || '',
				email: settings?.email || '',
				interval: settings?.interval as Interval,
				currency: settings?.currency as Currency,
				noticePeriod: settings?.notice_period ?? 3,
				id: settings?.id || '',
			},
		})
	);

	return {
		form,
	};
};

export const actions: Actions = {
	updateSettings: async (event) => {
		const form = await superValidate(event.request, zod(settingsSchema));
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
