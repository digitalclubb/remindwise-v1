import { graphql, HttpResponse } from 'msw';
import type { GetCategoriesQuery, Type } from '@graphql/types';

export const getCategories = graphql.query<GetCategoriesQuery>(
	'getCategories',
	() => {
		return HttpResponse.json(
			{
				data: {
					categories: {
						list: [
							{
								category: {
									id: 1,
									name: 'Example 1',
									iconId: 'icon-dashboard',
									reminders: {
										totalCount: 0,
										list: [],
									},
								},
							},
							{
								category: {
									id: 2,
									name: 'Example 2',
									iconId: 'icon-dashboard',
									reminders: {
										totalCount: 1,
										list: [],
									},
								},
							},
							{
								category: {
									id: 3,
									name: 'Example 3',
									iconId: 'icon-dashboard',
									reminders: {
										totalCount: 10,
										list: [],
									},
								},
							},
						],
					},
				},
			},
			{
				headers: {
					'Access-Control-Allow-Origin': '*',
				},
			}
		);
	}
);
