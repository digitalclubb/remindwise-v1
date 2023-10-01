import type { PageLoad } from './$types';
import { load_getReminders } from '$houdini';

export const load: PageLoad = async (event) => {
	const { getCategories } = await event.parent();

	const prom = new Promise((resolve) => {
		getCategories.subscribe((res) => {
			const cat = res.data?.categories?.list.find(
				(cat) => cat.category.name === event.params.slug
			);
			resolve(cat?.category.id);
		});
	});

	const category = await prom;

	// TODO when category is undefined problem, this happens right after updating the name of the category
	return {
		...(await load_getReminders({
			event,
			variables: { categoryId: category },
		})),
	};
};
