import { graphql, HttpResponse } from 'msw';

export const handlers = [
	// graphql.query('getSettings', ({ query, variables }) => {
	// 	return HttpResponse.json({
	// 		data: {
	// 			id: 1,
	// 			first_name: 'Example',
	// 			last_name: 'User',
	// 			email: 'user@example.com',
	// 			notice_period: '1 month',
	// 			interval: 'monthly',
	// 			currency: 'GBP',
	// 		},
	// 	});
	// }),
];
