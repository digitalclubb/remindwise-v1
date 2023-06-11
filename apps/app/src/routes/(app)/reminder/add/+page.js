import Category from './Category.svelte';
import Submit from './Submit.svelte';

export function load() {
	return {
		category: Category,
		submit: Submit,
	};
}
