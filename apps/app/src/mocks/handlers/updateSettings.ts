import { graphql, HttpResponse } from 'msw';
import type { UpdateSettingsMutation } from '@graphql/types';

export const updateSettings = graphql.mutation<UpdateSettingsMutation>(
	'updateSettings',
	() => {
		return HttpResponse.json({
			data: {
				updatesettingsCollection: {
					affectedCount: 1,
					records: [
						{
							id: '1',
						},
					],
				},
			},
		});
	}
);
