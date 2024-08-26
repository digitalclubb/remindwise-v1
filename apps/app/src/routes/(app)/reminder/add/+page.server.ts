import { AddCategoryStore, AddReminderStore } from '$houdini';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { addReminderSchema } from '../schema.js';
import { zod } from 'sveltekit-superforms/adapters';

export const actions: Actions = {
	addReminder: async (event) => {
		const formData = await event.request.formData();
		const form = await superValidate(formData, zod(addReminderSchema));
		const files = formData.getAll('documents') as File[];
		const { valid, data } = form;

		if (!valid) {
			return fail(400, { form });
		}

		let newId: string | undefined;

		// Add new category if added
		if (!data.categoryId) {
			const addCategory = new AddCategoryStore();

			const result = await addCategory.mutate(
				{
					category: data.category,
					iconId: 'flag',
					userId: data.userId,
				},
				{ event }
			);
			newId = result.data?.insertIntoCategoryCollection?.records[0].id;
		}

		// Add the new reminder
		const addReminder = new AddReminderStore();

		let startedAtDate = new Date();
		const currentDate = new Date();

		if (data.day) {
			startedAtDate.setDate(data.day);
			if (data.month) {
				startedAtDate.setMonth(data.month - 1);
			}

			if (startedAtDate.getTime() < currentDate.getTime() && !data.month) {
				startedAtDate.setMonth(startedAtDate.getMonth() + 1);
			} else if (
				startedAtDate.getTime() < currentDate.getTime() &&
				data.month
			) {
				startedAtDate.setFullYear(startedAtDate.getFullYear() + 1);
			}
		} else if (data.date) {
			startedAtDate = new Date(data.date);
			data.month = startedAtDate.getMonth() + 1;
			data.day = startedAtDate.getDate();
		}

		const reminder = await addReminder.mutate(
			{
				userId: data.userId,
				categoryId: newId || data.categoryId,
				name: data.name,
				type: data.type,
				company: data.company,
				cost: data.cost,
				day: startedAtDate.getDate(),
				month: startedAtDate.getMonth() + 1,
				frequency: data.frequency,
				autoRenewal: data.type === 'ONGOING' ? true : false,
				notes: data.notes ?? null,
				startedAt: startedAtDate,
			},
			{ event }
		);

		const reminderId =
			reminder.data?.insertIntoReminderCollection?.records[0].id;

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
