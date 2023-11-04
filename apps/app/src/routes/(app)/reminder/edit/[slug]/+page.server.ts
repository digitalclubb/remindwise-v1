import { updateReminderStore } from '$houdini';
import { redirect } from '@sveltejs/kit';

import type { Type, Frequency } from '@graphql/types';

export const actions = {
	editReminder: async (event) => {
		const data = await event.request.formData();

		const categoryId = parseInt(data.get('categoryId') as string);
		const name = data.get('name') as string;
		const type = data.get('type') as Type;
		const company = data.get('company') as string;
		const cost = parseFloat(data.get('cost') as string);
		const date = data.get('date')
			? new Date(data.get('date') as string)
			: new Date();
		const frequency = data.get('frequency') as Frequency;
		const autoRenewal = data.get('autoRenew') ? !!data.get('autoRenew') : null;
		const notes = data.get('notes') as string;

		const updateReminder = new updateReminderStore();
		await updateReminder.mutate(
			{
				id: parseInt(event.params.slug),
				categoryId,
				name,
				type,
				company,
				cost,
				date,
				frequency,
				autoRenewal,
				notes,
			},
			{ event }
		);

		// TODO on reminder add we want to take them to the categories page? the list might not be updated so need to look into how to bust cache
		throw redirect(303, `/category/reminder/${event.params.slug}`);
	},
};
