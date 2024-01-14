import { addCategoryStore, addReminderStore } from '$houdini';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { reminderSchema } from '../schema.js';

export const actions = {
	addReminder: async (event) => {
		const formData = await event.request.formData();
		const form = await superValidate(formData, reminderSchema);
		const files = formData.getAll('documents') as File[];
		const { valid, data } = form;

		if (!valid) {
			return fail(400, { form });
		}

		let newId: number | undefined;

		// Add new category if added
		if (!data.categoryId) {
			const addCategory = new addCategoryStore();

			const result = await addCategory.mutate(
				{
					category: data.category,
					isLocked: false,
					iconId: 'flag',
					userId: data.userId,
				},
				{ event }
			);
			newId = result.data?.insertIntocategoriesCollection?.records[0].id;
		}

		// Add the new reminder
		const addReminder = new addReminderStore();
		const reminder = await addReminder.mutate(
			{
				userId: data.userId,
				categoryId: newId || parseInt(data.categoryId),
				name: data.category,
				type: data.type,
				company: data.category,
				cost: data.cost,
				date: data.date ? new Date(data.date) : new Date(),
				frequency: data.frequency,
				autoRenewal: data.autoRenew,
				notes: data.notes,
			},
			{ event }
		);

		const reminderId =
			reminder.data?.insertIntoremindersCollection?.records[0].id;

		// Add documents to storage
		// Store by userId/reminderId/filename.ext
		for (const file of files) {
			if (file.size > 0 && file.name.length > 0) {
				const { error } = await event.locals.supabase.storage
					.from('documents')
					.upload(`${data.userId}/${reminderId}/${file.name}`, file);

				// TODO: Handle this gracefully!
				if (error) {
					throw error;
				}
			}
		}

		// TODO on reminder add we want to take them to the categories page? the list might not be updated so need to look into how to bust cache
		throw redirect(303, '/');
	},
};
