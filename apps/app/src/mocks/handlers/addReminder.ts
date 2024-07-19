import { graphql, HttpResponse } from 'msw';
import type { AddReminderMutation } from '@graphql/types';

export const addReminder = graphql.mutation<AddReminderMutation>(
	'AddReminder',
	() => {
		return HttpResponse.json({
			data: {
				insertIntoReminderCollection: {
					affectedCount: 1,
					records: [
						{
							id: 1,
						},
					],
				},
			},
		});
	}
);
