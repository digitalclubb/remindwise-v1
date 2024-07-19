import { graphql, HttpResponse } from 'msw';
import type { UpdateCategoryMutation } from '@graphql/types';

export const updateCategory = graphql.mutation<UpdateCategoryMutation>(
	'UpdateCategory',
	() => {
		return HttpResponse.json({
			data: {
				updateCategoryCollection: {
					affectedCount: 1,
				},
			},
		});
	}
);
