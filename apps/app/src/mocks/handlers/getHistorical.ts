import { graphql, HttpResponse } from 'msw';
import type { GetHistoricalQuery } from '@graphql/types';

export const getHistorical = graphql.query<GetHistoricalQuery>(
	'getHistorical',
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
