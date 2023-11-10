import { load_getReminder } from '$houdini';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	return {
		action: '?/editReminder',
		title: 'Edit reminder',
		...(await load_getReminder({
			event,
			variables: { slug: event.params.slug },
		})),
	};
};
