import { graphql, HttpResponse } from 'msw';
import type { GetAllRemindersQuery } from '@graphql/types';

export const getAllReminders = graphql.query<GetAllRemindersQuery>(
	'getAllReminders',
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
