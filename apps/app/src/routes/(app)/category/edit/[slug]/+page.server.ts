import { graphql } from '$houdini';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	delete: async (event) => {
		const category = event.params.slug;
		const actionMutation = graphql(`
			mutation deleteCategory($category: String!) {
				deleteFromcategoriesCollection(filter: { name: { eq: $category } }) {
					affectedCount
				}
			}
		`);

		await actionMutation.mutate({ category }, { event });

		throw redirect(303, '/');
	},
	edit: async (event) => {
		const data = await event.request.formData();
		const id = data.get('categoryId');
		const category = data.get('category') as string;
		const icons = data.get('icons') as string;
		if (!category) {
			return fail(400, { category, missing: true });
		}

		if (!icons) {
			return fail(400, { icons, missing: true });
		}

		const actionMutation = graphql(`
			mutation updateCategory($id: BigInt, $name: String, $iconId: String) {
				updatecategoriesCollection(
					filter: { id: { eq: $id } }
					set: { name: $name, iconId: $iconId }
				) {
					affectedCount
				}
			}
		`);

		await actionMutation.mutate(
			{ id, name: category, iconId: icons },
			{ event }
		);

		return { success: true, category };
	},
};
