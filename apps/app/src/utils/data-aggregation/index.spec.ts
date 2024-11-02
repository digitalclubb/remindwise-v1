import { describe, expect, it } from 'vitest';
import { calculateGraphData, type ReminderHistoryRecord } from './';
import { Frequency, Type, OperationType } from '@graphql/types';

const generateReminderEvents = (
	records: Partial<ReminderHistoryRecord>[]
): Omit<ReminderHistoryRecord, 'settings' | 'nodeId'>[] => {
	return records.map((props) => {
		return {
			id: '12345',
			user_id: '12345',
			reminder_id: props.reminder_id ?? '3',
			started_at: props.started_at ?? new Date(),
			category_id: props.category_id ?? '4',
			frequency: props.frequency ?? Frequency.Monthly,
			cost: props.cost ?? 100,
			operation_type: props.operation_type ?? OperationType.ReminderCreated,
			auto_renewal: props.auto_renewal ?? true,
			type: props.type ?? Type.Ongoing,
			day: props.day ?? 1,
			month: props.month ?? 2,
			created_at: props.created_at ?? new Date(),
		};
	});
};

describe('graphs', () => {
	describe('reminders that only have 1 created event history', () => {
		it('data for 2024 of a monthly reminder that started in Feb', () => {
			const result = calculateGraphData(
				2024,
				generateReminderEvents([
					{
						type: Type.Ongoing,
						created_at: new Date('2024-01-17T15:00:00.000Z'),
						started_at: new Date('2024-02-15T15:00:00.000Z'),
					},
				]) as ReminderHistoryRecord[]
			);
			expect(result.totalMonthCosts).toEqual(
				new Map([
					['1', 0],
					['2', 100],
					['3', 100],
					['4', 100],
					['5', 100],
					['6', 100],
					['7', 100],
					['8', 100],
					['9', 100],
					['10', 100],
					['11', 100],
					['12', 100],
				])
			);
			expect(result.perCategoryCosts.get('4')).toEqual(
				new Map([
					['1', 0],
					['2', 100],
					['3', 100],
					['4', 100],
					['5', 100],
					['6', 100],
					['7', 100],
					['8', 100],
					['9', 100],
					['10', 100],
					['11', 100],
					['12', 100],
				])
			);
		});

		it('data for 2025 of a monthly reminder that started in Feb of 2024', () => {
			const result = calculateGraphData(
				2025,
				generateReminderEvents([
					{
						type: Type.Ongoing,
						created_at: new Date('2024-02-15T15:00:00.000Z'),
					},
				]) as ReminderHistoryRecord[]
			);
			expect(result.totalMonthCosts).toEqual(
				new Map([
					['1', 100],
					['2', 100],
					['3', 100],
					['4', 100],
					['5', 100],
					['6', 100],
					['7', 100],
					['8', 100],
					['9', 100],
					['10', 100],
					['11', 100],
					['12', 100],
				])
			);
		});

		it('data for 2024 of a yearly reminder that started in June', () => {
			const result = calculateGraphData(
				2024,
				generateReminderEvents([
					{
						type: Type.Ongoing,
						created_at: new Date('2024-06-02T15:00:00.000Z'),
						frequency: Frequency.Annual,
						month: 6,
					},
				]) as ReminderHistoryRecord[]
			);
			expect(result.totalMonthCosts).toEqual(
				new Map([
					['1', 0],
					['2', 0],
					['3', 0],
					['4', 0],
					['5', 0],
					['6', 100],
					['7', 0],
					['8', 0],
					['9', 0],
					['10', 0],
					['11', 0],
					['12', 0],
				])
			);
		});

		it('data for 2025 of a yearly reminder that started in June of 2024', () => {
			const result = calculateGraphData(
				2025,
				generateReminderEvents([
					{
						type: Type.Ongoing,
						created_at: new Date('2024-06-02T15:00:00.000Z'),
						frequency: Frequency.Annual,
						month: 6,
					},
				]) as ReminderHistoryRecord[]
			);
			expect(result.totalMonthCosts).toEqual(
				new Map([
					['1', 0],
					['2', 0],
					['3', 0],
					['4', 0],
					['5', 0],
					['6', 100],
					['7', 0],
					['8', 0],
					['9', 0],
					['10', 0],
					['11', 0],
					['12', 0],
				])
			);
		});

		it('data for 2024 of a single reminder that happened in July', () => {
			const result = calculateGraphData(
				2024,
				generateReminderEvents([
					{
						type: Type.Single,
						created_at: new Date('2024-07-02T15:00:00.000Z'),
						month: 7,
					},
				]) as ReminderHistoryRecord[]
			);
			expect(result.totalMonthCosts).toEqual(
				new Map([
					['1', 0],
					['2', 0],
					['3', 0],
					['4', 0],
					['5', 0],
					['6', 0],
					['7', 100],
					['8', 0],
					['9', 0],
					['10', 0],
					['11', 0],
					['12', 0],
				])
			);
		});

		it('data for 2025 of a single reminder that happened in July of 2024', () => {
			const result = calculateGraphData(
				2025,
				generateReminderEvents([
					{
						type: Type.Single,
						created_at: new Date('2024-07-02T15:00:00.000Z'),
						month: 7,
					},
				]) as ReminderHistoryRecord[]
			);
			expect(result.totalMonthCosts).toEqual(
				new Map([
					['1', 0],
					['2', 0],
					['3', 0],
					['4', 0],
					['5', 0],
					['6', 0],
					['7', 0],
					['8', 0],
					['9', 0],
					['10', 0],
					['11', 0],
					['12', 0],
				])
			);
		});
	});

	describe('reminder that has multiple events in history', () => {
		describe('cost updated', () => {
			it('data for 2024 of a monthly reminder that started in Feb and got deleted', () => {
				const result = calculateGraphData(
					2024,
					generateReminderEvents([
						{
							created_at: new Date('2024-02-15T15:00:00.000Z'),
							operation_type: OperationType.ReminderCreated,
						},
						{
							created_at: new Date('2024-04-15T15:00:00.000Z'),
							operation_type: OperationType.ReminderDeleted,
						},
					]) as ReminderHistoryRecord[]
				);
				expect(result.totalMonthCosts).toEqual(
					new Map([
						['1', 0],
						['2', 0],
						['3', 0],
						['4', 0],
						['5', 0],
						['6', 0],
						['7', 0],
						['8', 0],
						['9', 0],
						['10', 0],
						['11', 0],
						['12', 0],
					])
				);
			});
			it('data for 2024 of a monthly reminder that started in Feb and cost updated in April, June and September', () => {
				const result = calculateGraphData(
					2024,
					generateReminderEvents([
						{
							created_at: new Date('2024-01-17T15:00:00.000Z'),
							started_at: new Date('2024-02-15T15:00:00.000Z'),
							operation_type: OperationType.ReminderCreated,
						},
						{
							created_at: new Date('2024-04-15T15:00:00.000Z'),
							started_at: new Date('2024-02-15T15:00:00.000Z'),
							cost: 200,
							operation_type: OperationType.ReminderUpdated,
						},
						{
							created_at: new Date('2024-06-15T15:00:00.000Z'),
							started_at: new Date('2024-02-15T15:00:00.000Z'),
							cost: 0,
							operation_type: OperationType.ReminderUpdated,
						},
						{
							created_at: new Date('2024-09-15T15:00:00.000Z'),
							started_at: new Date('2024-02-15T15:00:00.000Z'),
							cost: 100,
							operation_type: OperationType.ReminderUpdated,
						},
					]) as ReminderHistoryRecord[]
				);
				expect(result.totalMonthCosts).toEqual(
					new Map([
						['1', 0],
						['2', 100],
						['3', 100],
						['4', 200],
						['5', 200],
						['6', 0],
						['7', 0],
						['8', 0],
						['9', 100],
						['10', 100],
						['11', 100],
						['12', 100],
					])
				);
			});

			it('data for 2024 of a monthly reminder that starts in September and cost updated in August the month before', () => {
				const result = calculateGraphData(
					2024,
					generateReminderEvents([
						{
							created_at: new Date('2024-08-26T15:00:00.000Z'),
							started_at: new Date('2024-09-05T15:00:00.000Z'),
							operation_type: OperationType.ReminderCreated,
						},
						{
							created_at: new Date('2024-08-27T15:00:00.000Z'),
							started_at: new Date('2024-09-05T15:00:00.000Z'),
							operation_type: OperationType.ReminderUpdated,
							cost: 50,
						},
					]) as ReminderHistoryRecord[]
				);
				expect(result.totalMonthCosts).toEqual(
					new Map([
						['1', 0],
						['2', 0],
						['3', 0],
						['4', 0],
						['5', 0],
						['6', 0],
						['7', 0],
						['8', 0],
						['9', 50],
						['10', 50],
						['11', 50],
						['12', 50],
					])
				);
			});

			it('data for 2025 of a monthly reminder that started in Feb and cost updated in April, June and September in 2024', () => {
				const result = calculateGraphData(
					2025,
					generateReminderEvents([
						{
							created_at: new Date('2024-02-15T15:00:00.000Z'),
							operation_type: OperationType.ReminderCreated,
						},
						{
							created_at: new Date('2024-04-15T15:00:00.000Z'),
							cost: 200,
							operation_type: OperationType.ReminderUpdated,
						},
						{
							created_at: new Date('2024-06-15T15:00:00.000Z'),
							cost: 0,
							operation_type: OperationType.ReminderUpdated,
						},
						{
							created_at: new Date('2024-09-15T15:00:00.000Z'),
							cost: 100,
							operation_type: OperationType.ReminderUpdated,
						},
					]) as ReminderHistoryRecord[]
				);
				expect(result.totalMonthCosts).toEqual(
					new Map([
						['1', 100],
						['2', 100],
						['3', 100],
						['4', 100],
						['5', 100],
						['6', 100],
						['7', 100],
						['8', 100],
						['9', 100],
						['10', 100],
						['11', 100],
						['12', 100],
					])
				);
			});

			it('data for 2025 of a monthly reminder that started in Feb 2024 and cost updated in April, June and September in 2024 and March of 2025', () => {
				const result = calculateGraphData(
					2025,
					generateReminderEvents([
						{
							created_at: new Date('2024-02-15T15:00:00.000Z'),
							operation_type: OperationType.ReminderCreated,
						},
						{
							created_at: new Date('2024-04-15T15:00:00.000Z'),
							cost: 200,
							operation_type: OperationType.ReminderUpdated,
						},
						{
							created_at: new Date('2024-06-15T15:00:00.000Z'),
							cost: 0,
							operation_type: OperationType.ReminderUpdated,
						},
						{
							created_at: new Date('2024-09-15T15:00:00.000Z'),
							cost: 100,
							operation_type: OperationType.ReminderUpdated,
						},
						{
							created_at: new Date('2025-03-15T15:00:00.000Z'),
							cost: 150,
							operation_type: OperationType.ReminderUpdated,
						},
					]) as ReminderHistoryRecord[]
				);
				expect(result.totalMonthCosts).toEqual(
					new Map([
						['1', 100],
						['2', 100],
						['3', 150],
						['4', 150],
						['5', 150],
						['6', 150],
						['7', 150],
						['8', 150],
						['9', 150],
						['10', 150],
						['11', 150],
						['12', 150],
					])
				);
			});

			it("data for 2024 of a yearly reminder that starts in April next year and we're in August", () => {
				const result = calculateGraphData(
					2024,
					generateReminderEvents([
						{
							created_at: new Date('2024-08-12T15:00:00.000Z'),
							started_at: new Date('2025-04-04T15:00:00.000Z'),
							operation_type: OperationType.ReminderCreated,
							frequency: Frequency.Annual,
							day: 4,
							month: 4,
						},
					]) as ReminderHistoryRecord[]
				);
				expect(result.totalMonthCosts).toEqual(
					new Map([
						['1', 0],
						['2', 0],
						['3', 0],
						['4', 0],
						['5', 0],
						['6', 0],
						['7', 0],
						['8', 0],
						['9', 0],
						['10', 0],
						['11', 0],
						['12', 0],
					])
				);
			});

			it('data for 2024 of a yearly reminder that starts in April 2025 year, got updated in September 2024', () => {
				const result = calculateGraphData(
					2024,
					generateReminderEvents([
						{
							created_at: new Date('2024-08-12T15:00:00.000Z'),
							started_at: new Date('2025-04-04T15:00:00.000Z'),
							operation_type: OperationType.ReminderCreated,
							frequency: Frequency.Annual,
							day: 4,
							month: 4,
						},
						{
							created_at: new Date('2024-09-02T15:00:00.000Z'),
							started_at: new Date('2025-04-04T15:00:00.000Z'),
							operation_type: OperationType.ReminderUpdated,
							frequency: Frequency.Annual,
							day: 4,
							month: 4,
							cost: 200,
						},
					]) as ReminderHistoryRecord[]
				);
				expect(result.totalMonthCosts).toEqual(
					new Map([
						['1', 0],
						['2', 0],
						['3', 0],
						['4', 0],
						['5', 0],
						['6', 0],
						['7', 0],
						['8', 0],
						['9', 0],
						['10', 0],
						['11', 0],
						['12', 0],
					])
				);
			});

			it('data for 2025 of a yearly reminder that starts in April 2025 year, got updated in September 2024', () => {
				const result = calculateGraphData(
					2025,
					generateReminderEvents([
						{
							created_at: new Date('2024-08-12T15:00:00.000Z'),
							started_at: new Date('2025-04-04T15:00:00.000Z'),
							operation_type: OperationType.ReminderCreated,
							frequency: Frequency.Annual,
							day: 4,
							month: 4,
						},
						{
							created_at: new Date('2024-09-02T15:00:00.000Z'),
							started_at: new Date('2025-04-04T15:00:00.000Z'),
							operation_type: OperationType.ReminderUpdated,
							frequency: Frequency.Annual,
							day: 4,
							month: 4,
							cost: 200,
						},
					]) as ReminderHistoryRecord[]
				);
				expect(result.totalMonthCosts).toEqual(
					new Map([
						['1', 0],
						['2', 0],
						['3', 0],
						['4', 200],
						['5', 0],
						['6', 0],
						['7', 0],
						['8', 0],
						['9', 0],
						['10', 0],
						['11', 0],
						['12', 0],
					])
				);
			});

			it('data for 2026 of a yearly reminder that starts in April 2025 year, got updated in September 2024 and September 2026', () => {
				const result = calculateGraphData(
					2026,
					generateReminderEvents([
						{
							created_at: new Date('2024-08-12T15:00:00.000Z'),
							started_at: new Date('2025-04-04T15:00:00.000Z'),
							operation_type: OperationType.ReminderCreated,
							frequency: Frequency.Annual,
							day: 4,
							month: 4,
						},
						{
							created_at: new Date('2024-09-02T15:00:00.000Z'),
							started_at: new Date('2025-04-04T15:00:00.000Z'),
							operation_type: OperationType.ReminderUpdated,
							frequency: Frequency.Annual,
							day: 4,
							month: 4,
							cost: 200,
						},
						{
							created_at: new Date('2026-09-02T15:00:00.000Z'),
							started_at: new Date('2025-04-04T15:00:00.000Z'),
							operation_type: OperationType.ReminderUpdated,
							frequency: Frequency.Annual,
							day: 4,
							month: 4,
							cost: 100,
						},
					]) as ReminderHistoryRecord[]
				);
				expect(result.totalMonthCosts).toEqual(
					new Map([
						['1', 0],
						['2', 0],
						['3', 0],
						['4', 100],
						['5', 0],
						['6', 0],
						['7', 0],
						['8', 0],
						['9', 0],
						['10', 0],
						['11', 0],
						['12', 0],
					])
				);
			});

			it('data for 2024 of a yearly reminder that happened in July and was updated in july', () => {
				const result = calculateGraphData(
					2024,
					generateReminderEvents([
						{
							created_at: new Date('2024-07-02T15:00:00.000Z'),
							operation_type: OperationType.ReminderCreated,
							frequency: Frequency.Annual,
							month: 7,
						},
						{
							created_at: new Date('2024-07-02T15:00:00.000Z'),
							operation_type: OperationType.ReminderUpdated,
							frequency: Frequency.Annual,
							cost: 200,
							month: 7,
						},
					]) as ReminderHistoryRecord[]
				);
				expect(result.totalMonthCosts).toEqual(
					new Map([
						['1', 0],
						['2', 0],
						['3', 0],
						['4', 0],
						['5', 0],
						['6', 0],
						['7', 200],
						['8', 0],
						['9', 0],
						['10', 0],
						['11', 0],
						['12', 0],
					])
				);
			});

			it('data for 2024 of a yearly reminder that happened in July and was updated in september', () => {
				const result = calculateGraphData(
					2024,
					generateReminderEvents([
						{
							created_at: new Date('2024-07-02T15:00:00.000Z'),
							operation_type: OperationType.ReminderCreated,
							frequency: Frequency.Annual,
							month: 7,
						},
						{
							created_at: new Date('2024-09-02T15:00:00.000Z'),
							operation_type: OperationType.ReminderUpdated,
							frequency: Frequency.Annual,
							month: 7,
							cost: 200,
						},
					]) as ReminderHistoryRecord[]
				);
				expect(result.totalMonthCosts).toEqual(
					new Map([
						['1', 0],
						['2', 0],
						['3', 0],
						['4', 0],
						['5', 0],
						['6', 0],
						['7', 200],
						['8', 0],
						['9', 0],
						['10', 0],
						['11', 0],
						['12', 0],
					])
				);
			});

			it('data for 2024 of a yearly reminder that happened in July and was updated in september 2025', () => {
				const result = calculateGraphData(
					2024,
					generateReminderEvents([
						{
							created_at: new Date('2024-07-02T15:00:00.000Z'),
							operation_type: OperationType.ReminderCreated,
							frequency: Frequency.Annual,
							month: 7,
						},
						{
							created_at: new Date('2025-09-02T15:00:00.000Z'),
							operation_type: OperationType.ReminderUpdated,
							frequency: Frequency.Annual,
							month: 7,
							cost: 200,
						},
					]) as ReminderHistoryRecord[]
				);
				expect(result.totalMonthCosts).toEqual(
					new Map([
						['1', 0],
						['2', 0],
						['3', 0],
						['4', 0],
						['5', 0],
						['6', 0],
						['7', 100],
						['8', 0],
						['9', 0],
						['10', 0],
						['11', 0],
						['12', 0],
					])
				);
			});

			it('data for 2025 of a yearly reminder that happened in July 2024 and got updated in September 2024', () => {
				const result = calculateGraphData(
					2025,
					generateReminderEvents([
						{
							created_at: new Date('2024-07-02T15:00:00.000Z'),
							operation_type: OperationType.ReminderCreated,
							frequency: Frequency.Annual,
							month: 7,
						},
						{
							created_at: new Date('2024-09-02T15:00:00.000Z'),
							operation_type: OperationType.ReminderUpdated,
							frequency: Frequency.Annual,
							month: 7,
							cost: 200,
						},
					]) as ReminderHistoryRecord[]
				);
				expect(result.totalMonthCosts).toEqual(
					new Map([
						['1', 0],
						['2', 0],
						['3', 0],
						['4', 0],
						['5', 0],
						['6', 0],
						['7', 200],
						['8', 0],
						['9', 0],
						['10', 0],
						['11', 0],
						['12', 0],
					])
				);
			});

			it('data for 2025 of a yearly reminder that happened in July 2024 and got updated in June of 2025', () => {
				const result = calculateGraphData(
					2025,
					generateReminderEvents([
						{
							created_at: new Date('2024-07-02T15:00:00.000Z'),
							operation_type: OperationType.ReminderCreated,
							frequency: Frequency.Annual,
							month: 7,
						},
						{
							created_at: new Date('2025-09-02T15:00:00.000Z'),
							operation_type: OperationType.ReminderUpdated,
							frequency: Frequency.Annual,
							month: 7,
							cost: 200,
						},
					]) as ReminderHistoryRecord[]
				);
				expect(result.totalMonthCosts).toEqual(
					new Map([
						['1', 0],
						['2', 0],
						['3', 0],
						['4', 0],
						['5', 0],
						['6', 0],
						['7', 200],
						['8', 0],
						['9', 0],
						['10', 0],
						['11', 0],
						['12', 0],
					])
				);
			});

			it('data for 2024 of a single reminder that happened in July and was updated in September', () => {
				const result = calculateGraphData(
					2024,
					generateReminderEvents([
						{
							created_at: new Date('2024-07-02T15:00:00.000Z'),
							operation_type: OperationType.ReminderCreated,
							type: Type.Single,
							month: 7,
						},
						{
							created_at: new Date('2024-09-02T15:00:00.000Z'),
							operation_type: OperationType.ReminderUpdated,
							type: Type.Single,
							month: 7,
							cost: 200,
						},
					]) as ReminderHistoryRecord[]
				);
				expect(result.totalMonthCosts).toEqual(
					new Map([
						['1', 0],
						['2', 0],
						['3', 0],
						['4', 0],
						['5', 0],
						['6', 0],
						['7', 200],
						['8', 0],
						['9', 0],
						['10', 0],
						['11', 0],
						['12', 0],
					])
				);
			});

			it('data for 2025 of a single reminder that happened in July of 2024 and was updated in September', () => {
				const result = calculateGraphData(
					2025,
					generateReminderEvents([
						{
							created_at: new Date('2024-07-02T15:00:00.000Z'),
							operation_type: OperationType.ReminderCreated,
							type: Type.Single,
							month: 7,
						},
						{
							created_at: new Date('2024-09-02T15:00:00.000Z'),
							operation_type: OperationType.ReminderUpdated,
							type: Type.Single,
							month: 7,
							cost: 200,
						},
					]) as ReminderHistoryRecord[]
				);
				expect(result.totalMonthCosts).toEqual(
					new Map([
						['1', 0],
						['2', 0],
						['3', 0],
						['4', 0],
						['5', 0],
						['6', 0],
						['7', 0],
						['8', 0],
						['9', 0],
						['10', 0],
						['11', 0],
						['12', 0],
					])
				);
			});
		});
		describe('category updated', () => {
			it('data for 2024 monthly reminder which updates category', () => {
				const result = calculateGraphData(
					2024,
					generateReminderEvents([
						{
							created_at: new Date('2024-08-15T15:00:00.000Z'),
							started_at: new Date('2024-08-15T15:00:00.000Z'),
							operation_type: OperationType.ReminderCreated,
						},
						{
							created_at: new Date('2024-10-15T15:00:00.000Z'),
							started_at: new Date('2024-08-15T15:00:00.000Z'),
							cost: 200,
							operation_type: OperationType.ReminderUpdated,
						},
						{
							created_at: new Date('2024-10-15T15:00:00.000Z'),
							started_at: new Date('2024-08-15T15:00:00.000Z'),
							cost: 200,
							category_id: '5',
							operation_type: OperationType.ReminderUpdated,
						},
					]) as ReminderHistoryRecord[]
				);

				expect(result.perCategoryCosts.get('4')).toEqual(undefined);

				expect(result.perCategoryCosts.get('5')).toEqual(
					new Map([
						['1', 0],
						['2', 0],
						['3', 0],
						['4', 0],
						['5', 0],
						['6', 0],
						['7', 0],
						['8', 100],
						['9', 100],
						['10', 200],
						['11', 200],
						['12', 200],
					])
				);
			});

			it('data for 2025 monthly reminder which updates category', () => {
				const result = calculateGraphData(
					2025,
					generateReminderEvents([
						{
							created_at: new Date('2024-08-15T15:00:00.000Z'),
							operation_type: OperationType.ReminderCreated,
						},
						{
							created_at: new Date('2024-10-15T15:00:00.000Z'),
							cost: 200,
							operation_type: OperationType.ReminderUpdated,
						},
						{
							created_at: new Date('2024-10-15T15:00:00.000Z'),
							cost: 200,
							category_id: '5',
							operation_type: OperationType.ReminderUpdated,
						},
					]) as ReminderHistoryRecord[]
				);

				expect(result.perCategoryCosts.get('4')).toEqual(undefined);

				expect(result.perCategoryCosts.get('5')).toEqual(
					new Map([
						['1', 200],
						['2', 200],
						['3', 200],
						['4', 200],
						['5', 200],
						['6', 200],
						['7', 200],
						['8', 200],
						['9', 200],
						['10', 200],
						['11', 200],
						['12', 200],
					])
				);
			});
		});
		describe('autoRenewal updated', () => {
			it('data for 2024 monthly with auto renewal off from Nov 2024', () => {
				const result = calculateGraphData(
					2024,
					generateReminderEvents([
						{
							created_at: new Date('2024-08-15T15:00:00.000Z'),
							started_at: new Date('2024-08-15T15:00:00.000Z'),
							operation_type: OperationType.ReminderCreated,
						},
						{
							created_at: new Date('2024-10-15T15:00:00.000Z'),
							started_at: new Date('2024-08-15T15:00:00.000Z'),
							cost: 200,
							operation_type: OperationType.ReminderUpdated,
						},
						{
							created_at: new Date('2024-11-15T15:00:00.000Z'),
							started_at: new Date('2024-08-15T15:00:00.000Z'),
							cost: 200,
							operation_type: OperationType.ReminderUpdated,
							auto_renewal: false,
						},
					]) as ReminderHistoryRecord[]
				);

				expect(result.perCategoryCosts.get('4')).toEqual(
					new Map([
						['1', 0],
						['2', 0],
						['3', 0],
						['4', 0],
						['5', 0],
						['6', 0],
						['7', 0],
						['8', 100],
						['9', 100],
						['10', 200],
						['11', 200],
						['12', 0],
					])
				);
			});

			it('data for 2025 monthly with auto renewal off from Nov 2024', () => {
				const result = calculateGraphData(
					2025,
					generateReminderEvents([
						{
							created_at: new Date('2024-08-15T15:00:00.000Z'),
							operation_type: OperationType.ReminderCreated,
						},
						{
							created_at: new Date('2024-10-15T15:00:00.000Z'),
							cost: 200,
							operation_type: OperationType.ReminderUpdated,
						},
						{
							created_at: new Date('2024-11-15T15:00:00.000Z'),
							cost: 200,
							operation_type: OperationType.ReminderUpdated,
							auto_renewal: false,
						},
					]) as ReminderHistoryRecord[]
				);

				expect(result.perCategoryCosts.get('4')).toEqual(
					new Map([
						['1', 0],
						['2', 0],
						['3', 0],
						['4', 0],
						['5', 0],
						['6', 0],
						['7', 0],
						['8', 0],
						['9', 0],
						['10', 0],
						['11', 0],
						['12', 0],
					])
				);
			});

			it('data for 2025 monthly with auto renewal off from feb 2025', () => {
				const result = calculateGraphData(
					2025,
					generateReminderEvents([
						{
							created_at: new Date('2024-08-15T15:00:00.000Z'),
							operation_type: OperationType.ReminderCreated,
						},
						{
							created_at: new Date('2024-10-15T15:00:00.000Z'),
							cost: 200,
							operation_type: OperationType.ReminderUpdated,
						},
						{
							created_at: new Date('2025-02-15T15:00:00.000Z'),
							cost: 200,
							operation_type: OperationType.ReminderUpdated,
							auto_renewal: false,
						},
					]) as ReminderHistoryRecord[]
				);

				expect(result.perCategoryCosts.get('4')).toEqual(
					new Map([
						['1', 200],
						['2', 200],
						['3', 0],
						['4', 0],
						['5', 0],
						['6', 0],
						['7', 0],
						['8', 0],
						['9', 0],
						['10', 0],
						['11', 0],
						['12', 0],
					])
				);
			});

			it('data for 2024 yearly with auto renewal off from Nov 2024', () => {
				const result = calculateGraphData(
					2024,
					generateReminderEvents([
						{
							created_at: new Date('2024-08-15T15:00:00.000Z'),
							operation_type: OperationType.ReminderCreated,
							frequency: Frequency.Annual,
							month: 8,
						},
						{
							created_at: new Date('2024-10-15T15:00:00.000Z'),
							cost: 200,
							operation_type: OperationType.ReminderUpdated,
							frequency: Frequency.Annual,
							month: 8,
						},
						{
							created_at: new Date('2024-11-15T15:00:00.000Z'),
							cost: 200,
							operation_type: OperationType.ReminderUpdated,
							frequency: Frequency.Annual,
							month: 8,
							auto_renewal: false,
						},
					]) as ReminderHistoryRecord[]
				);

				expect(result.perCategoryCosts.get('4')).toEqual(
					new Map([
						['1', 0],
						['2', 0],
						['3', 0],
						['4', 0],
						['5', 0],
						['6', 0],
						['7', 0],
						['8', 200],
						['9', 0],
						['10', 0],
						['11', 0],
						['12', 0],
					])
				);
			});

			it('data for 2025 yearly with auto renewal off from Nov 2024', () => {
				const result = calculateGraphData(
					2025,
					generateReminderEvents([
						{
							created_at: new Date('2024-08-15T15:00:00.000Z'),
							operation_type: OperationType.ReminderCreated,
							frequency: Frequency.Annual,
							month: 8,
						},
						{
							created_at: new Date('2024-10-15T15:00:00.000Z'),
							cost: 200,
							operation_type: OperationType.ReminderUpdated,
							frequency: Frequency.Annual,
							month: 8,
						},
						{
							created_at: new Date('2024-11-15T15:00:00.000Z'),
							cost: 200,
							operation_type: OperationType.ReminderUpdated,
							frequency: Frequency.Annual,
							month: 8,
							auto_renewal: false,
						},
					]) as ReminderHistoryRecord[]
				);

				expect(result.perCategoryCosts.get('4')).toEqual(
					new Map([
						['1', 0],
						['2', 0],
						['3', 0],
						['4', 0],
						['5', 0],
						['6', 0],
						['7', 0],
						['8', 0],
						['9', 0],
						['10', 0],
						['11', 0],
						['12', 0],
					])
				);
			});

			it('data for 2025 yearly with auto renewal off from April 2025', () => {
				const result = calculateGraphData(
					2025,
					generateReminderEvents([
						{
							created_at: new Date('2024-08-15T15:00:00.000Z'),
							operation_type: OperationType.ReminderCreated,
							frequency: Frequency.Annual,
							month: 8,
						},
						{
							created_at: new Date('2024-10-15T15:00:00.000Z'),
							cost: 200,
							operation_type: OperationType.ReminderUpdated,
							frequency: Frequency.Annual,
							month: 8,
						},
						{
							created_at: new Date('2025-04-15T15:00:00.000Z'),
							cost: 200,
							operation_type: OperationType.ReminderUpdated,
							frequency: Frequency.Annual,
							month: 8,
							auto_renewal: false,
						},
					]) as ReminderHistoryRecord[]
				);

				expect(result.perCategoryCosts.get('4')).toEqual(
					new Map([
						['1', 0],
						['2', 0],
						['3', 0],
						['4', 0],
						['5', 0],
						['6', 0],
						['7', 0],
						['8', 0],
						['9', 0],
						['10', 0],
						['11', 0],
						['12', 0],
					])
				);
			});
		});
	});

	describe('multiple reminders from different categories', () => {
		const reminderEvents = generateReminderEvents([
			{
				created_at: new Date('2024-06-17T15:00:00.000Z'),
				started_at: new Date('2024-07-15T15:00:00.000Z'),
				operation_type: OperationType.ReminderCreated,
				month: 7,
				type: Type.Single,
				category_id: '9',
			},
			{
				created_at: new Date('2024-09-15T15:00:00.000Z'),
				cost: 200,
				operation_type: OperationType.ReminderUpdated,
				type: Type.Single,
				month: 7,
				category_id: '9',
			},
			{
				reminder_id: '5',
				created_at: new Date('2024-08-17T15:00:00.000Z'),
				started_at: new Date('2024-09-15T15:00:00.000Z'),
				cost: 100,
				operation_type: OperationType.ReminderCreated,
			},
			{
				reminder_id: '6',
				created_at: new Date('2024-03-17T15:00:00.000Z'),
				started_at: new Date('2024-04-15T15:00:00.000Z'),
				month: 4,
				cost: 100,
				frequency: Frequency.Annual,
				operation_type: OperationType.ReminderCreated,
			},
		]);
		it('data for 2024', () => {
			const result = calculateGraphData(
				2024,
				reminderEvents as ReminderHistoryRecord[]
			);
			expect(result.perCategoryCosts.get('9')).toEqual(
				new Map([
					['1', 0],
					['2', 0],
					['3', 0],
					['4', 0],
					['5', 0],
					['6', 0],
					['7', 200],
					['8', 0],
					['9', 0],
					['10', 0],
					['11', 0],
					['12', 0],
				])
			);
			expect(result.perCategoryCosts.get('4')).toEqual(
				new Map([
					['1', 0],
					['2', 0],
					['3', 0],
					['4', 100],
					['5', 0],
					['6', 0],
					['7', 0],
					['8', 0],
					['9', 100],
					['10', 100],
					['11', 100],
					['12', 100],
				])
			);
		});

		it('data for 2025', () => {
			const result = calculateGraphData(
				2025,
				reminderEvents as ReminderHistoryRecord[]
			);
			expect(result.perCategoryCosts.get('9')).toEqual(
				new Map([
					['1', 0],
					['2', 0],
					['3', 0],
					['4', 0],
					['5', 0],
					['6', 0],
					['7', 0],
					['8', 0],
					['9', 0],
					['10', 0],
					['11', 0],
					['12', 0],
				])
			);
			expect(result.perCategoryCosts.get('4')).toEqual(
				new Map([
					['1', 100],
					['2', 100],
					['3', 100],
					['4', 200],
					['5', 100],
					['6', 100],
					['7', 100],
					['8', 100],
					['9', 100],
					['10', 100],
					['11', 100],
					['12', 100],
				])
			);
		});
	});
});
