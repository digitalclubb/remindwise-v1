import { getReminderStore } from '$houdini';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const getReminder = new getReminderStore();
	const { data } = await getReminder.fetch({
		event,
		variables: { slug: parseInt(event.params.slug) },
	});

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

	return {
		files,
		data,
	};
};
