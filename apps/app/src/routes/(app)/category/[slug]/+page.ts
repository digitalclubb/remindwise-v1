import type { PageLoad } from './$types';
import { load_GetReminders } from '$houdini';

export const load: PageLoad = async (event) => {
	const { GetCategories } = await event.parent();
	const today = new Date();
	const upcoming = new Date();
	upcoming.setMonth(upcoming.getMonth() + 2);

	const prom = new Promise<number>((resolve, reject) => {
		GetCategories.subscribe((res) => {
			const cat = res.data?.categories?.list.find(
				(cat) => cat.category.name === event.params.slug
			);
			if (cat?.category.id) resolve(cat?.category.id);
		});
		reject();
	});

	const category = await prom;

	// TODO when category is undefined problem, this happens right after updating the name of the category
	return {
		...(await load_GetReminders({
			event,
			variables: {
				categoryId: category,
				today,
				upcoming,
				first: 5,
				after: null,
			},
		})),
	};
};
