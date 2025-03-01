import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { filterListUpcomingReminders, filterUpcomingCosts } from '.';
import { Frequency, type Reminder } from '@graphql/types';
import { UTCDate } from '@date-fns/utc';

describe('filters', () => {
	describe('filterListUpcomingReminders', () => {
		beforeEach(() => {
			// tell vitest we use mocked time
			vi.useFakeTimers();
		});

		afterEach(() => {
			// restoring date after each test run
			vi.useRealTimers();
		});

		it('returns all the reminders which are within 4 months ', () => {
			// 12th Jan 2025
			vi.setSystemTime(new Date(2025, 0, 12));
			const arrays = [
				{
					reminder: {
						auto_renewal: false,
						started_at: new UTCDate(2025, 1, 12),
						frequency: Frequency.Monthly,
					} as Reminder,
				},
				{
					reminder: {
						auto_renewal: false,
						started_at: new UTCDate(2025, 3, 24),
						frequency: Frequency.Monthly,
					} as Reminder,
				},
			];

			const filtered = filterListUpcomingReminders(arrays, 4);
			const expected = arrays.map((a, i) => ({
				...a.reminder,
				due_date: filtered[i].due_date,
			}));
			expect(filtered).toEqual(expected);
		});

		it('returns only 1 reminder which is within 4 months', () => {
			// 12th Jan 2025
			vi.setSystemTime(new Date(2025, 0, 12));
			const arrays = [
				{
					reminder: {
						auto_renewal: false,
						started_at: new UTCDate(2025, 1, 12),
						frequency: Frequency.Monthly,
					} as Reminder,
				},
				{
					reminder: {
						auto_renewal: false,
						started_at: new UTCDate(2026, 3, 24),
						frequency: Frequency.Annual,
					} as Reminder,
				},
			];

			const filtered = filterListUpcomingReminders(arrays, 4);
			const expected = arrays.map((a) => ({
				...a.reminder,
				due_date: filtered[0].due_date,
			}));
			expect(filtered).toEqual([expected[0]]);
		});

		it('returns only 1 reminder which is within 5 months and is in the next year', () => {
			// 12th Nov 2025
			vi.setSystemTime(new Date(2025, 11, 12));
			const arrays = [
				{
					reminder: {
						auto_renewal: false,
						started_at: new UTCDate(2025, 1, 12),
						frequency: Frequency.Monthly,
					} as Reminder,
				},
				{
					reminder: {
						auto_renewal: false,
						started_at: new UTCDate(2026, 3, 24),
						frequency: Frequency.Annual,
					} as Reminder,
				},
			];

			const filtered = filterListUpcomingReminders(arrays, 5);
			const expected = arrays.map((a, i) => ({
				...a.reminder,
				due_date: filtered[i].due_date,
			}));
			expect(filtered).toEqual(expected);
		});
	});

	describe('filterUpcomingCosts', () => {
		beforeEach(() => {
			// tell vitest we use mocked time
			vi.useFakeTimers();
		});

		afterEach(() => {
			// restoring date after each test run
			vi.useRealTimers();
		});

		it('validate filtered values are correct', () => {
			vi.setSystemTime(new Date(2025, 0, 12));
			const monthCosts = new Map([
				['1', 0],
				['2', 0],
				['3', 10],
				['4', 10],
				['5', 10],
				['6', 10],
				['6', 10],
				['7', 10],
				['8', 10],
				['9', 0],
				['10', 0],
				['11', 0],
				['12', 0],
			]);

			const nextYearCosts = new Map([
				['1', 10],
				['2', 10],
				['3', 10],
				['4', 10],
				['5', 0],
				['6', 0],
				['6', 0],
				['7', 0],
				['8', 0],
				['9', 0],
				['10', 0],
				['11', 0],
				['12', 0],
			]);

			// current month is January and we are looking 4 months ahead
			let costs = filterUpcomingCosts(monthCosts, nextYearCosts, 1, 4);

			expect(costs).toBe(30);

			// current month is November and we are looking 4 months ahead
			costs = filterUpcomingCosts(monthCosts, nextYearCosts, 11, 4);

			expect(costs).toBe(30);
		});
	});
});
