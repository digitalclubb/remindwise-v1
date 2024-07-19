import { graphql, HttpResponse } from 'msw';
import type { UpdateSettingsMutation } from '@graphql/types';

export const updateSettings = graphql.mutation<UpdateSettingsMutation>(
	'UpdateSettings',
	() => {
		return HttpResponse.json({
			data: {
				updateSettingsCollection: {
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
