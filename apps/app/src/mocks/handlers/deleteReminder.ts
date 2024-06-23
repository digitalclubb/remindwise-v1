import { graphql, HttpResponse } from 'msw';
import type { DeleteReminderMutation } from '@graphql/types';

export const deleteReminder = graphql.mutation<DeleteReminderMutation>(
	'deleteReminder',
	() => {
		return HttpResponse.json({
			data: {
				deleteFromremindersCollection: {
					affectedCount: 1,
				},
			},
		});
	}
);
