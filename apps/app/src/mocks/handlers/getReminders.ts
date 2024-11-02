import { graphql, HttpResponse } from 'msw';
import type { GetRemindersQuery } from '@graphql/types';
import { Type } from '@graphql/types';

export const getReminders = graphql.query<GetRemindersQuery>(
	'GetReminders',
	() => {
		return HttpResponse.json(
			{
				data: {
					upcomingReminders: {
						list: [
							{
								reminder: {
									id: '1',
									name: 'Example upcoming reminder',
									cost: 10,
									type: Type.Ongoing,
									auto_renewal: false,
									started_at: new Date(),
									created_at: new Date(),
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
									cost: 10,
									type: Type.Ongoing,
									started_at: new Date(),
									created_at: new Date(),
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
									cost: 10,
									type: Type.Ongoing,
									started_at: new Date(),
									created_at: new Date(),
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
									cost: 10,
									type: Type.Ongoing,
									started_at: new Date(),
									created_at: new Date(),
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
