import { graphql, HttpResponse } from 'msw';

export const getReminders = graphql.query('getReminders', () => {
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
