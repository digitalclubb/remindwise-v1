import type { LayoutServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { reminderSchema } from './schema';
import { getReminderStore } from '$houdini';

export const load: LayoutServerLoad = async (event) => {
	const parentData = await event.parent();
	const userId = parentData.session.user.id;

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

	if (event.params.slug) {
		const getReminder = new getReminderStore();
		const { data } = await getReminder.fetch({
			event,
			variables: { slug: event.params.slug },
		});

		const rem = data?.reminders?.list[0].reminder;
		console.log(
			'reminder',
			data?.reminders?.list[0].reminder,
			event.params.slug
		);
		const form = await superValidate(
			{ category: rem?.category?.name, name: rem?.name },
			reminderSchema
		);

		return {
			files,
			form,
		};
	}

	const form = await superValidate(reminderSchema);

	return {
		files,
		form,
	};
};
