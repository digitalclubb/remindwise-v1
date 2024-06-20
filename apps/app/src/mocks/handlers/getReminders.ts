import { graphql, HttpResponse } from 'msw';
import type { GetRemindersQuery } from '@graphql/types';

export const getReminders = graphql.query<GetRemindersQuery>(
	'getReminders',
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
