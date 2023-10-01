import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	const { getSettings } = await event.parent();

	return {
		getSettings,
	};
};
