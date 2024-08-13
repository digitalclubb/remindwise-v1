import { graphql, HttpResponse } from 'msw';
import type { GetRemindersQuery } from '@graphql/types';

export const getReminders = graphql.query<GetRemindersQuery>(
	'GetReminders',
	() => {
		return HttpResponse.json(
			{
				data: {
					upcoming: {
						list: [
							{
								reminder: {
									id: '1',
									name: 'Example upcoming reminder',
									company: 'Example company',
									cost: 10,
									day: 10,
									month: 10,
									auto_renewal: false,
									category: {
										id: '1',
										icon_id: 'icon-help',
										name: 'Example 1',
									},
								},
							},
						],
					},
					reminders: {
						pageInfo: {
							hasPreviousPage: false,
							hasNextPage: true,
						},
						list: [
							{
								reminder: {
									id: '2',
									name: 'Example reminder 1',
									company: 'Example company',
									cost: 10,
									category: {
										id: '1',
										icon_id: 'icon-help',
										name: 'Example 1',
									},
								},
							},
							{
								reminder: {
									id: '3',
									name: 'Example reminder 2',
									company: 'Example company',
									cost: 10,
									category: {
										id: '1',
										icon_id: 'icon-help',
										name: 'Example 1',
									},
								},
							},
							{
								reminder: {
									id: '4',
									name: 'Example reminder 3',
									company: 'Example company',
									cost: 10,
									category: {
										id: '1',
										icon_id: 'icon-help',
										name: 'Example 1',
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
