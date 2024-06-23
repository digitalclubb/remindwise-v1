import { graphql, HttpResponse } from 'msw';
import type { DeleteCategoryMutation } from '@graphql/types';

export const deleteCategory = graphql.mutation<DeleteCategoryMutation>(
	'deleteCategory',
	() => {
		return HttpResponse.json(
			{
				data: {
					deleteFromcategoriesCollection: {
						affectedCount: 1		
					},
				},
			}
		);
	}
);
