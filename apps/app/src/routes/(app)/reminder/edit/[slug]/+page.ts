import { load_getReminder } from '$houdini';
import Submit from './Submit.svelte';

export const load = async (event) => {
	return {
		action: '?/editReminder',
		title: 'Edit reminder',
		submit: Submit,
		...(await load_getReminder({
			event,
			variables: { slug: event.params.slug },
		})),
	};
};
