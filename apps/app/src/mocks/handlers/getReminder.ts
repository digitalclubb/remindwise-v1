import { graphql, HttpResponse } from 'msw';

export const getReminder = graphql.query('getReminder', () => {
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
