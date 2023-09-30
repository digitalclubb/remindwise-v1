import type { PageLoad } from './$types';
import { load_getRemindersY } from '$houdini';

export const load: PageLoad = async (event) => {
	const { x } = await event.parent();
	let d;
	x.subscribe((res) => {
		const cat = res.data?.categories?.list.find(
			(cat) => cat.category.name === event.params.slug
		);
		d = cat?.category.id;
	});
	return {
		...(await load_getRemindersY({
			event,
			variables: { categoryId: d },
		})),
	};
};
