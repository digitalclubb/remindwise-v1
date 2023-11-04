import type { PageLoad } from './$types';
import { load_getAllReminders } from '$houdini';

export const load: PageLoad = async (event) => {
	const today = new Date();
	const upcoming = new Date();
	upcoming.setMonth(upcoming.getMonth() + 2);

	return {
		...(await load_getAllReminders({
			event,
			variables: { today, upcoming },
		})),
	};
};
