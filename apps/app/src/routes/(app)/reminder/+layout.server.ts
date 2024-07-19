import type { LayoutServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { reminderSchema } from './schema';
import { GetReminderStore } from '$houdini';
import { Frequency, Type } from '@graphql/types';
import { zod } from 'sveltekit-superforms/adapters';

export const load: LayoutServerLoad = async (event) => {
	const parentData = await event.parent();
	const userId = parentData.session?.user.id;

	// Get all files for a user and a reminder (folder)
	const { data: readFiles } = await event.locals.supabase.storage
		.from('documents')
		.list(`${userId}/${event.params.slug}`, {
			limit: 100,
			offset: 0,
			sortBy: { column: 'name', order: 'asc' },
		});

	// TODO: error?

	// Just get the filename for us to get the download URL
	const filenames =
		readFiles?.map((file) => `${userId}/${event.params.slug}/${file.name}`) ||
		[];

	// Fetch all signed URLs for our files
	const { data: signedUrls } = await event.locals.supabase.storage
		.from('documents')
		.createSignedUrls(filenames, 60);

	// TODO: error?

	// Clean data to just be file name and url
	const files = signedUrls?.map((file, index) => {
		return {
			name: readFiles?.[index].name,
			url: file.signedUrl,
		};
	});

	// If we're on the edit page, then we want to fetch the data and prepropulate our form
	if (event.params.slug) {
		const getReminder = new GetReminderStore();
		const { data } = await getReminder.fetch({
			event,
			variables: { slug: parseInt(event.params.slug) },
		});

		const reminder = data?.reminders?.list[0].reminder;

		if (reminder) {
			const form = await superValidate(
				zod(reminderSchema, {
					defaults: {
						userId: userId || '',
						categoryId: reminder.category?.id || 0,
						category: reminder.category?.name || '',
						name: reminder.name,
						type: reminder.type as Type, // Is there better way to do this?
						company: reminder.company,
						cost: reminder.cost,
						frequency: reminder.frequency as Frequency,
						day: reminder.day || undefined,
						month: reminder.month || undefined,
						autoRenew: reminder.auto_renewal,
						notes: reminder.notes || '',
					},
				})
			);

			return {
				files,
				form,
			};
		}
	}

	const form = await superValidate(zod(reminderSchema));
	return {
		files,
		form,
	};
};
