import { graphql, HttpResponse } from 'msw';
import type { GetHistoryQuery } from '@graphql/types';
import { Frequency, Type, OperationType } from '@graphql/types';

const date = new Date();
export const getHistory = graphql.query<GetHistoryQuery>('GetSettings', () => {
	return HttpResponse.json(
		{
			data: {
				history: {
					list: [
						{
							history: {
								id: '1',
								cost: 10,
								auto_renewal: true,
								user_id: '',
								category_id: '1',
								type: Type.Ongoing,
								frequency: Frequency.Monthly,
								reminder_id: '2',
								started_at: date,
								created_at: date,
								day: date.getDate(),
								month: date.getMonth() + 1,
								operation_type: OperationType.ReminderCreated,
							},
						},

						{
							history: {
								id: '2',
								cost: 10,
								auto_renewal: true,
								user_id: '',
								category_id: '1',
								type: Type.Ongoing,
								frequency: Frequency.Monthly,
								reminder_id: '3',
								started_at: date,
								created_at: date,
								day: date.getDate(),
								month: date.getMonth() + 1,
								operation_type: OperationType.ReminderCreated,
							},
						},
						{
							history: {
								id: '3',
								cost: 10,
								auto_renewal: true,
								user_id: '',
								category_id: '4',
								type: Type.Ongoing,
								frequency: Frequency.Monthly,
								reminder_id: '4',
								started_at: date,
								created_at: date,
								day: date.getDate(),
								month: date.getMonth() + 1,
								operation_type: OperationType.ReminderCreated,
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
});
