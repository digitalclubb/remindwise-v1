import { graphql, HttpResponse } from 'msw';
import type { DeleteCategoryMutation } from '@graphql/types';

export const deleteCategory = graphql.mutation<DeleteCategoryMutation>(
	'DeleteCategory',
	() => {
		return HttpResponse.json({
			data: {
				deleteFromCategoryCollection: {
					affectedCount: 1,
				},
			},
		});
	}
);
