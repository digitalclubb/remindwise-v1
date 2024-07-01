import { AddCategoryStore, AddReminderStore } from '$houdini';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { reminderSchema } from '../schema.js';
import { zod } from 'sveltekit-superforms/adapters';

export const actions: Actions = {
	addReminder: async (event) => {
		const formData = await event.request.formData();
		const form = await superValidate(formData, zod(reminderSchema));
		const files = formData.getAll('documents') as File[];
		const { valid, data } = form;

		if (!valid) {
			return fail(400, { form });
		}

		let newId: number | undefined;

		// Add new category if added
		if (!data.categoryId) {
			const addCategory = new AddCategoryStore();

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
		const addReminder = new AddReminderStore();
		const reminder = await addReminder.mutate(
			{
				userId: data.userId,
				categoryId: newId || data.categoryId,
				name: data.name,
				type: data.type,
				company: data.company,
				cost: data.cost,
				date: data.date ? new Date(data.date) : new Date(),
				frequency: data.frequency,
				autoRenewal: data.autoRenew,
				notes: data.notes ?? null,
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
