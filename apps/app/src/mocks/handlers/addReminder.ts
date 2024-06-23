import { graphql, HttpResponse } from 'msw';
import type { AddReminderMutation } from '@graphql/types';

export const addReminder = graphql.mutation<AddReminderMutation>(
	'addReminder',
	() => {
		return HttpResponse.json(
			{
				data: {
					insertIntoremindersCollection: {
						affectedCount: 1,
                        records: [{
							id: 1
                        }]			
					},
				},
			}
		);
	}
);
