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
									name: 'Example',
									iconId: 'dashboard',
									reminders: {
										totalCount: 1,
										list: [
											{
												reminder: {
													name: 'Test reminder',
													cost: 100,
													type: 'ONGOING' as Type,
												},
											},
										],
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
