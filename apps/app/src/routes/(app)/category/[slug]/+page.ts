import type { PageLoad } from './$types';
import { load_getReminders } from '$houdini';

export const load: PageLoad = async (event) => {
	const { getCategories } = await event.parent();

	const prom = new Promise((resolve) => {
		getCategories.subscribe((res) => {
			console.log('categoriesss', res);
			const cat = res.data?.categories?.list.find(
				(cat) => cat.category.name === event.params.slug
			);
			resolve(cat?.category.id);
		});
	});

	const category = await prom;

	console.log('category', category);
	// TODO when category is undefined problem
	return {
		...(await load_getReminders({
			event,
			variables: { categoryId: category },
		})),
	};
};
