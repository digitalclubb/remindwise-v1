import { graphql, HttpResponse } from 'msw';
import type { GetAllRemindersQuery } from '@graphql/types';

const reminder = {
	id: 1,
	name: 'Upcoming reminder',
	company: 'Example company',
	cost: 10,
	total: 10,
	date: '2024-10-10',
	autoRenewal: false,
	category: {
		iconId: 'watch',
		name: 'Example',
	},
};

export const getAllReminders = graphql.query<GetAllRemindersQuery>(
	'getAllReminders',
	() => {
		return HttpResponse.json(
			{
				data: {
					upcoming: {
						list: [{ reminder }],
					},
					reminders: {
						pageInfo: {
							hasPreviousPage: false,
							hasNextPage: true,
						},
						list: [{ reminder }],
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
