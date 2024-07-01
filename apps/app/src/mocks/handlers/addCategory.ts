import { graphql, HttpResponse } from 'msw';
import type { AddCategoryMutation } from '@graphql/types';

export const addCategory = graphql.mutation<AddCategoryMutation>(
	'AddCategory',
	() => {
		return HttpResponse.json({
			data: {
				insertIntocategoriesCollection: {
					affectedCount: 1,
					records: [
						{
							id: 1,
							name: 'Example add',
							iconId: 'help',
						},
					],
				},
			},
		});
	}
);
