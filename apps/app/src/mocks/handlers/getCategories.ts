import { graphql, HttpResponse } from 'msw';
import type { GetCategoriesQuery } from '@graphql/types';

export const getCategories = graphql.query<GetCategoriesQuery>(
	'GetCategories',
	() => {
		return HttpResponse.json(
			{
				data: {
					categories: {
						list: [
							{
								category: {
									id: '1',
									name: 'Example 1',
									icon_id: 'icon-help',
									reminders: {
										totalCount: 0,
										list: [],
									},
								},
							},
							{
								category: {
									id: '2',
									name: 'Example 2',
									icon_id: 'icon-help',
									reminders: {
										totalCount: 1,
										list: [],
									},
								},
							},
							{
								category: {
									id: '3',
									name: 'Example 3',
									icon_id: 'icon-help',
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
