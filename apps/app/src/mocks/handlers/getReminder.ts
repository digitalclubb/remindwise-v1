import { graphql, HttpResponse } from 'msw';
import type { GetReminderQuery, Type, Frequency } from '@graphql/types';

export const getReminder = graphql.query<GetReminderQuery>(
	'GetReminder',
	() => {
		return HttpResponse.json(
			{
				data: {
					reminders: {
						list: [
							{
								reminder: {
									id: 1,
									name: 'Example reminder',
									type: 'ONGOING' as Type,
									company: 'Example company',
									cost: 10,
									date: new Date('2024-10-10'),
									frequency: 'MONTHLY' as Frequency,
									autoRenewal: false,
									notes: 'Example notes',
									category: {
										id: 1,
										name: 'Example 1',
										iconId: 'icon-help',
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
