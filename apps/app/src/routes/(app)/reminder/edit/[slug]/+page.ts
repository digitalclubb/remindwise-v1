import { load_getReminder } from '$houdini';

export const load = async (event) => {
	return {
		action: '?/editReminder',
		title: 'Edit reminder',
		...(await load_getReminder({
			event,
			variables: { slug: event.params.slug },
		})),
	};
};
