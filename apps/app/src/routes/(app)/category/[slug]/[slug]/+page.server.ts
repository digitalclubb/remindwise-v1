import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { data, error } = await event.locals.supabase.storage
		.from('documents')
		.download(`bbc26ea6-7114-42db-9d1f-f2b08e32590c/spending.png`);

	if (error) {
		throw error;
	}

	return {
		file: URL.createObjectURL(data),
	};
};
