import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return {
		action: '?/editReminder',
		title: 'Edit reminder',
		editing: true,
	};
};
