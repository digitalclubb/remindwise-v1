import { graphql, HttpResponse } from 'msw';

export const getHistorical = graphql.query('getHistorical', () => {
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
