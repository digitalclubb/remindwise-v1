import { graphql, HttpResponse } from 'msw';
import type { GetReminderQuery, } from '@graphql/types';
import { Type, Frequency } from '@graphql/types';

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
									type: Type.Ongoing,
									company: 'Example company',
									cost: 10,
									day: 10,
									frequency: Frequency.Monthly,
									auto_renewal: false,
									notes: 'Example notes',
									category: {
										id: 1,
										name: 'Example 1',
										icon_id: 'icon-help',
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
