import type { PageLoad } from './$types';
import { load_GetReminders } from '$houdini';

export const load: PageLoad = async (event) => {
	return {
		...event.data,
		...(await load_GetReminders({
			event,
			variables: { first: 5, after: null },
		})),
	};
};
