import { graphql, HttpResponse } from 'msw';
import type { UpdateCategoryMutation } from '@graphql/types';

export const updateCategory = graphql.mutation<UpdateCategoryMutation>(
	'updateCategory',
	() => {
		return HttpResponse.json({
			data: {
				updatecategoriesCollection: {
					affectedCount: 1,
				},
			},
		});
	}
);
