import type { PageLoad } from './$types';
import { load_getReminders } from '$houdini';

export const load: PageLoad = async (event) => {
	const { getCategories } = await event.parent();
	const today = new Date();
	const upcoming = new Date();
	upcoming.setMonth(upcoming.getMonth() + 2);

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
			variables: { categoryId: category, today, upcoming },
		})),
	};
};
