import { graphql, HttpResponse } from 'msw';
import type { UpdateReminderMutation } from '@graphql/types';

export const updateReminder = graphql.mutation<UpdateReminderMutation>(
	'UpdateReminder',
	() => {
		return HttpResponse.json({
			data: {
				updateremindersCollection: {
					affectedCount: 1,
				},
			},
		});
	}
);
