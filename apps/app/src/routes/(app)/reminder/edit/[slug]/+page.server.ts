import { AddCategoryStore, UpdateReminderStore } from '$houdini';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { reminderSchema } from '../../schema.js';
import { zod } from 'sveltekit-superforms/adapters';

export const actions: Actions = {
	editReminder: async (event) => {
		const formData = await event.request.formData();
		const form = await superValidate(formData, zod(reminderSchema));
		const files = formData.getAll('documents') as File[];
		const { valid, data } = form;

		if (!valid) {
			return fail(400, { form });
		}
		const deleted = formData.get('deleted') as string;

		const updateReminder = new UpdateReminderStore();

		let newId: number | undefined;
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

		await updateReminder.mutate(
			{
				id: parseInt(event.params.slug || ''),
				categoryId: newId || data.categoryId,
				name: data.name,
				type: data.type,
				company: data.company,
				cost: data.cost,
				day: data.day,
				month: data.month,
				frequency: data.frequency,
				autoRenewal: data.autoRenew,
				notes: data.notes ?? null,
			},
			{ event }
		);

		// Delete files
		const deletedParse = JSON.parse(deleted);
		if (deletedParse.length) {
			const paths = deletedParse.map(
				(name: string) => `${data.userId}/${event.params.slug}/${name}`
			);
			const { error } = await event.locals.supabase.storage
				.from('documents')
				.remove(paths);

			// TODO: Handle this gracefully!
			if (error) {
				throw error;
			}
		}

		// Update documents in storage
		// Store by userId/reminderId/filename.ext
		// `files` will only ever contain new files
		// TODO: Duplicates?
		for (const file of files) {
			if (file.size > 0) {
				const { error } = await event.locals.supabase.storage
					.from('documents')
					.upload(`${data.userId}/${event.params.slug}/${file.name}`, file);

				// TODO: Handle this gracefully!
				if (error) {
					throw error;
				}
			}
		}

		// TODO on reminder add we want to take them to the categories page? the list might not be updated so need to look into how to bust cache
		throw redirect(303, `/category/reminder/${event.params.slug}`);
	},
};
