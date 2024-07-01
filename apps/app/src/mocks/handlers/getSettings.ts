import { graphql, HttpResponse } from 'msw';
import type { GetSettingsQuery, Interval, Currency } from '@graphql/types';

export const getSettings = graphql.query<GetSettingsQuery>(
	'GetSettings',
	() => {
		return HttpResponse.json(
			{
				data: {
					settings: {
						list: [
							{
								setting: {
									id: '1',
									first_name: 'Example',
									last_name: 'User',
									email: 'user@example.com',
									notice_period: 1,
									interval: 'monthly' as Interval,
									currency: 'GBP' as Currency,
								},
							},
						],
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
