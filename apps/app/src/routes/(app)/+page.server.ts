import { GetHistoryStore } from '$houdini';
import type { History } from '@graphql/types';
import { calculateGraphData } from '../../utils/data-aggregation';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const myQuery = new GetHistoryStore();
	const { data } = await myQuery.fetch({ event });

	const destructure = data?.history?.list.map((history) => {
		return {
			...history.history,
			started_at: new Date(history.history.started_at),
			created_at: new Date(history.history.created_at),
		};
	});

	// do we need to sort the reminders or do they come sorted from DB?
	if (destructure) {
		const list = destructure as History[];
		const result = calculateGraphData(new Date().getFullYear(), list);

		return {
			graphData: result,
		};
	}

	return {};
};
