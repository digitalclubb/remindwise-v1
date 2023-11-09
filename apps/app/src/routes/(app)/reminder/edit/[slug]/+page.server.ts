import { addCategoryStore, updateReminderStore } from '$houdini';
import { redirect } from '@sveltejs/kit';

import type { Type, Frequency } from '@graphql/types';

export const actions = {
	editReminder: async (event) => {
		const data = await event.request.formData();

		const categoryId = data.get('categoryId')
			? parseInt(data.get('categoryId') as string)
			: -1;
		const category = data.get('category') as string;
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
		const userId = data.get('userId') as string;
		const files = data.getAll('documents') as File[];

		const updateReminder = new updateReminderStore();

		let newId: number | undefined;
		if (categoryId === -1) {
			const addCategory = new addCategoryStore();

			const result = await addCategory.mutate(
				{
					category,
					isLocked: false,
					iconId: 'flag',
					userId,
				},
				{ event }
			);
			newId = result.data?.insertIntocategoriesCollection?.records[0].id;
		}

		await updateReminder.mutate(
			{
				id: parseInt(event.params.slug),
				categoryId: newId || categoryId,
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

		// Update documents in storage
		for (const file of files) {
			const { error } = await event.locals.supabase.storage
				.from('documents')
				.upload(`${userId}/${file.name}`, file);
			if (error) {
				throw error;
			}
		}

		// TODO on reminder add we want to take them to the categories page? the list might not be updated so need to look into how to bust cache
		throw redirect(303, `/category/reminder/${event.params.slug}`);
	},
};
