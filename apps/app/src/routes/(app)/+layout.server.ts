import { GetHistoryStore } from '$houdini';
import { calculateGraphData } from '../../utils/data-aggregation';
import type { LayoutServerLoad } from './$types';
import type { History } from '@graphql/types';

export const load: LayoutServerLoad = async (event) => {
	const {
		locals: { safeGetSession },
		cookies,
	} = event;
	const { session, user } = await safeGetSession();

	const myQuery = new GetHistoryStore();
	const { data } = await myQuery.fetch({ event });

	const historyEvents = data?.history?.list.flatMap(
		(history) => history.history
	);

	if (historyEvents) {
		const graphData = calculateGraphData(
			new Date(),
			historyEvents as History[]
		);

		return {
			graphData,
			session,
			user,
		};
	}

	return {
		session,
		user,
		cookies: cookies.getAll(),
	};
};
