import { graphql, HttpResponse } from 'msw';

export const getAllReminders = graphql.query('getAllReminders', () => {
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
});
