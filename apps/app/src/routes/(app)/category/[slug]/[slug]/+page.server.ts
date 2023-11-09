import { getReminderStore, load_getReminder } from '$houdini';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const getReminder = new getReminderStore();
	const { data } = await getReminder.fetch({ event });

	const { data: docData, error } = await event.locals.supabase.storage
		.from('documents')
		.download(`3c35ae9e-e8cf-4185-a9e5-d77f4d01ac44/zoopla.png`);

	if (error) {
		throw error;
	}

	return {
		file: URL.createObjectURL(docData),
		data,
	};
};
