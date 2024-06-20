import { graphql, HttpResponse } from 'msw';

export const handlers = [
	graphql.query('getSettings', ({ query, variables }) => {
		return HttpResponse.json({
			data: {
				id: 1,
				first_name: 'Gareth',
				last_name: 'Clubb',
				email: 'thewelsh@gmail.com',
				notice_period: '1 month',
				interval: 'monthly',
				currency: 'GBP',
			},
		});
	}),
];
