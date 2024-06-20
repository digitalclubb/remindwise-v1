import { graphql, HttpResponse } from 'msw';
import type { GetAllRemindersQuery } from '@graphql/types';

export const getAllReminders = graphql.query<GetAllRemindersQuery>(
	'getAllReminders',
	() => {
		return HttpResponse.json(
			{
				data: {
					upcoming: {
						list: [
							{
								reminder: {
									id: 1,
									name: 'Example upcoming reminder',
									company: 'Example company',
									cost: 10,
									date: '2024-10-10',
									autoRenewal: false,
									category: {
										iconId: 'icon-watch',
										name: 'Example',
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
									id: 2,
									name: 'Example reminder 1',
									company: 'Example company',
									cost: 10,
									total: 10,
									category: {
										iconId: 'icon-watch',
										name: 'Example',
									},
								},
							},
							{
								reminder: {
									id: 3,
									name: 'Example reminder 2',
									company: 'Example company',
									cost: 10,
									total: 10,
									category: {
										iconId: 'icon-watch',
										name: 'Example',
									},
								},
							},
							{
								reminder: {
									id: 4,
									name: 'Example reminder 3',
									company: 'Example company',
									cost: 10,
									total: 10,
									category: {
										iconId: 'icon-watch',
										name: 'Example',
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
