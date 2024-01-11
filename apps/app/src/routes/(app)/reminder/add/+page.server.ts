import { addCategoryStore, addReminderStore } from '$houdini';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import type { Type, Frequency } from '@graphql/types';
import { reminderSchema } from '../schema.js';

export const actions = {
	addReminder: async (event) => {
		// const formData = await event.request.formData();

		// const categoryId = formData.get('categoryId')
		// 	? parseInt(formData.get('categoryId') as string)
		// 	: -1;
		// const category = formData.get('category') as string;
		// const name = formData.get('name') as string;
		// const type = formData.get('type') as Type;
		// const company = formData.get('company') as string;
		// const cost = parseFloat(formData.get('cost') as string);
		// const date = formData.get('date')
		// 	? new Date(formData.get('date') as string)
		// 	: new Date();
		// const frequency = formData.get('frequency') as Frequency;
		// const autoRenewal = formData.get('autoRenew')
		// 	? !!formData.get('autoRenew')
		// 	: null;
		// const notes = formData.get('notes') as string;
		// const userId = formData.get('userId') as string;
		// const files = formData.getAll('documents') as File[];

		const form = await superValidate(event.request, reminderSchema);
		console.log('POST', form);

		if (!form.valid) {
			return fail(400, { form });
		}

		let newId: number | undefined;

		// // Add new category if added
		// if (categoryId === -1) {
		// 	const addCategory = new addCategoryStore();

		// 	const result = await addCategory.mutate(
		// 		{
		// 			category,
		// 			isLocked: false,
		// 			iconId: 'flag',
		// 			userId,
		// 		},
		// 		{ event }
		// 	);
		// 	newId = result.data?.insertIntocategoriesCollection?.records[0].id;
		// }

		// // Add the new reminder
		// const addReminder = new addReminderStore();
		// const reminder = await addReminder.mutate(
		// 	{
		// 		userId,
		// 		categoryId: newId || categoryId,
		// 		name,
		// 		type,
		// 		company,
		// 		cost,
		// 		date,
		// 		frequency,
		// 		autoRenewal,
		// 		notes,
		// 	},
		// 	{ event }
		// );

		// const reminderId =
		// 	reminder.data?.insertIntoremindersCollection?.records[0].id;

		// // Add documents to storage
		// // Store by userId/reminderId/filename.ext
		// for (const file of files) {
		// 	if (file.size > 0 && file.name.length > 0) {
		// 		const { error } = await event.locals.supabase.storage
		// 			.from('documents')
		// 			.upload(`${userId}/${reminderId}/${file.name}`, file);

		// 		// TODO: Handle this gracefully!
		// 		if (error) {
		// 			throw error;
		// 		}
		// 	}
		// }

		// // TODO on reminder add we want to take them to the categories page? the list might not be updated so need to look into how to bust cache
		// throw redirect(303, '/');
	},
};
