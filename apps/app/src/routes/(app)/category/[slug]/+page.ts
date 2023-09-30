import type { PageLoad } from './$types';
import { load_getReminders } from '$houdini';

export const load: PageLoad = async (event) => {
	const { getCategories } = await event.parent();
	let category;
	getCategories.subscribe((res) => {
		const cat = res.data?.categories?.list.find(
			(cat) => cat.category.name === event.params.slug
		);
		category = cat?.category.id;
	});
	return {
		...(await load_getReminders({
			event,
			variables: { categoryId: category },
		})),
	};
};
