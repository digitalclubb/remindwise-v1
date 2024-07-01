import { graphql, HttpResponse } from 'msw';
import type { UpdateCategoryMutation } from '@graphql/types';

export const updateCategory = graphql.mutation<UpdateCategoryMutation>(
	'UpdateCategory',
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
