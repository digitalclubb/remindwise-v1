import { addReminderStore } from '$houdini';
import { redirect } from '@sveltejs/kit';

import type { Type, Frequency } from '@graphql/types';

export const actions = {
	addReminder: async (event) => {
		const data = await event.request.formData();

		const userid = data.get('userId') as string;
		const categoryId = parseInt(data.get('categoryId') as string);
		const name = data.get('name') as string;
		const type = data.get('type') as Type;
		const company = data.get('company') as string;
		const cost = parseFloat(data.get('cost') as string);
		const datePurchased = new Date(data.get('renewal') as string);
		const frequency = data.get('frequency') as Frequency;
		const autoRenewal = data.get('auto') === 'true';
		const notes = data.get('notes') as string;

		const addReminder = new addReminderStore();
		await addReminder.mutate(
			{
				userid,
				categoryId,
				name,
				type,
				company,
				cost,
				datePurchased,
				frequency,
				autoRenewal,
				notes,
			},
			{ event }
		);

		// TODO on reminder add we want to take them to the categories page? the list might not be updated so need to look into how to bust cache
		throw redirect(303, '/');
	},
};
