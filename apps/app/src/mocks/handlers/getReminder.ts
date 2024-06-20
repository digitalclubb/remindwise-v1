import { graphql, HttpResponse } from 'msw';
import type { GetReminderQuery } from '@graphql/types';

export const getReminder = graphql.query<GetReminderQuery>(
	'getReminder',
	() => {
		return HttpResponse.json(
			{
				data: {},
			},
			{
				headers: {
					'Access-Control-Allow-Origin': '*',
				},
			}
		);
	}
);
