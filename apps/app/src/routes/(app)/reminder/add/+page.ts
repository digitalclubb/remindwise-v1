import Submit from './Submit.svelte';

export function load() {
	return {
		action: '?/addReminder',
		title: 'Add a reminder',
		submit: Submit,
	};
}
