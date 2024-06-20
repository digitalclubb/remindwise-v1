import { graphql, HttpResponse } from 'msw';
import type { GetCategoriesQuery } from '@graphql/types';

export const getCategories = graphql.query('getCategories', () => {
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
												cost: '100',
												type: 'ONGOING',
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
});
