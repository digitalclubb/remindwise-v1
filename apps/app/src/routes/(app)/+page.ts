import type { PageLoad } from './$types';
import { load_getHistorical, load_getReminders } from '$houdini';

export const load: PageLoad = async (event) => {
	const today = new Date();
	const upcoming = new Date();
	upcoming.setMonth(upcoming.getMonth() + 1);

	const yearStart = new Date(`01/01/${today.getFullYear()}`);
	const yearEnd = new Date(`12/31/${today.getFullYear()}`);

	return {
		...(await load_getReminders({
			event,
			variables: { today, upcoming, first: 5, after: null },
		})),
		...(await load_getHistorical({
			event,
			variables: { yearStart, yearEnd },
		})),
	};
};
