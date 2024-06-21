import { graphql, HttpResponse } from 'msw';
import type { GetReminderQuery, Type } from '@graphql/types';

export const getReminder = graphql.query<GetReminderQuery>(
	'getReminder',
	() => {
		return HttpResponse.json(
			{
				data: {
					reminders: {
						list: [
							{
								reminder: {
									id: '1',
									name: 'Example reminder',
									type: 'ONGOING' as Type,
									company: 'Example company',
									cost: 10,
									date: '2024-10-10',
									frequency: 'MONTHLY',
									autoRenewal: false,
									notes: 'Example notes',
									category: {
										id: 1,
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
