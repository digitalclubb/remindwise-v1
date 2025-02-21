import type { GetReminder$result } from '$houdini';
import type { Reminder } from '@graphql/types';
import { addMonths } from 'date-fns/addMonths';
import { getRenewalDate } from '../../lambdas/notifier/notification';
import type { GraphData } from '../data-aggregation';

export type Upcoming = Reminder & { due_date: Date };
export type UpcomingList = { reminder: Reminder }[];

export const filterListUpcomingReminders = (
	upcomingReminders: UpcomingList,
	upcomingFilter: number
) => {
	const minDate = new Date();
	const maxDate = addMonths(minDate, upcomingFilter);

	const filteredUpcomingReminders: Upcoming[] = [];
	upcomingReminders.forEach((reminder) => {
		const reminderType = reminder.reminder as Reminder;
		const renewal = getRenewalDate(reminderType, minDate);
		// Check if the new renewal is within our filter
		if (
			renewal &&
			renewal?.getTime() > minDate.getTime() &&
			renewal?.getTime() < maxDate.getTime()
		) {
			filteredUpcomingReminders.push({ ...reminderType, due_date: renewal });
		}
	});

	return filteredUpcomingReminders;
};

export const filterUpcomingCosts = (
	monthCosts: GraphData['totalMonthCosts'] | undefined,
	nextYearCosts: GraphData['nextYearCosts'] | undefined,
	currentMonth: number,
	upcomingFilter: number
) => {
	let filteredUpcomingCosts = 0;
	const nextMonth = currentMonth + upcomingFilter;

	monthCosts?.forEach((value, month) => {
		const monthNumber = parseInt(month);
		if (nextMonth >= 13 && monthNumber <= nextMonth - 12) {
			filteredUpcomingCosts += nextYearCosts!.get(monthNumber.toString())!;
		} else if (monthNumber > currentMonth) {
			filteredUpcomingCosts += value;
		}
	});

	return filteredUpcomingCosts;
};
