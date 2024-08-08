import { describe, expect, it } from 'vitest';
import { calculateGraphData, type ReminderHistoryRecord } from './';
import { Frequency, Type, OperationType } from '@graphql/types';

const generateReminderEvents = (
	records: Partial<ReminderHistoryRecord>[] = []
) => {
	return records.map((props) => {
		return {
			id: 12345,
			userId: 12345,
			reminderId: props.reminderId ?? 3,
			startedAt: props.startedAt ?? new Date(),
			categoryId: props.categoryId ?? 4,
			frequency: props.frequency ?? Frequency.Monthly,
			cost: props.cost ?? 100,
			operationType: props.operationType ?? OperationType.ReminderCreated,
			autoRenewal: props.autoRenewal ?? true,
			type: props.type ?? Type.Ongoing,
			day: props.day,
			month: props.month,
			createdAt: props.createdAt ?? new Date(),
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
						createdAt: new Date('2024-01-17T15:00:00.000Z'),
						startedAt: new Date('2024-02-15T15:00:00.000Z'),
					},
				])
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
						createdAt: new Date('2024-02-15T15:00:00.000Z'),
					},
				])
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
						createdAt: new Date('2024-06-02T15:00:00.000Z'),
						frequency: Frequency.Annual,
						month: 6,
					},
				])
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
						createdAt: new Date('2024-06-02T15:00:00.000Z'),
						frequency: Frequency.Annual,
						month: 6,
					},
				])
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
						createdAt: new Date('2024-07-02T15:00:00.000Z'),
						month: 7,
					},
				])
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
						createdAt: new Date('2024-07-02T15:00:00.000Z'),
						month: 7,
					},
				])
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
							createdAt: new Date('2024-02-15T15:00:00.000Z'),
							operationType: OperationType.ReminderCreated,
						},
						{
							createdAt: new Date('2024-04-15T15:00:00.000Z'),
							operationType: OperationType.ReminderDeleted,
						},
					])
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
							createdAt: new Date('2024-01-17T15:00:00.000Z'),
							startedAt: new Date('2024-02-15T15:00:00.000Z'),
							operationType: OperationType.ReminderCreated,
						},
						{
							createdAt: new Date('2024-04-15T15:00:00.000Z'),
							cost: 200,
							operationType: OperationType.ReminderUpdated,
						},
						{
							createdAt: new Date('2024-06-15T15:00:00.000Z'),
							cost: 0,
							operationType: OperationType.ReminderUpdated,
						},
						{
							createdAt: new Date('2024-09-15T15:00:00.000Z'),
							cost: 100,
							operationType: OperationType.ReminderUpdated,
						},
					])
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

			it('data for 2025 of a monthly reminder that started in Feb and cost updated in April, June and September in 2024', () => {
				const result = calculateGraphData(
					2025,
					generateReminderEvents([
						{
							createdAt: new Date('2024-02-15T15:00:00.000Z'),
							operationType: OperationType.ReminderCreated,
						},
						{
							createdAt: new Date('2024-04-15T15:00:00.000Z'),
							cost: 200,
							operationType: OperationType.ReminderUpdated,
						},
						{
							createdAt: new Date('2024-06-15T15:00:00.000Z'),
							cost: 0,
							operationType: OperationType.ReminderUpdated,
						},
						{
							createdAt: new Date('2024-09-15T15:00:00.000Z'),
							cost: 100,
							operationType: OperationType.ReminderUpdated,
						},
					])
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
							createdAt: new Date('2024-02-15T15:00:00.000Z'),
							operationType: OperationType.ReminderCreated,
						},
						{
							createdAt: new Date('2024-04-15T15:00:00.000Z'),
							cost: 200,
							operationType: OperationType.ReminderUpdated,
						},
						{
							createdAt: new Date('2024-06-15T15:00:00.000Z'),
							cost: 0,
							operationType: OperationType.ReminderUpdated,
						},
						{
							createdAt: new Date('2024-09-15T15:00:00.000Z'),
							cost: 100,
							operationType: OperationType.ReminderUpdated,
						},
						{
							createdAt: new Date('2025-03-15T15:00:00.000Z'),
							cost: 150,
							operationType: OperationType.ReminderUpdated,
						},
					])
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

			it('data for 2024 of a yearly reminder that happened in July and was updated in july', () => {
				const result = calculateGraphData(
					2024,
					generateReminderEvents([
						{
							createdAt: new Date('2024-07-02T15:00:00.000Z'),
							operationType: OperationType.ReminderCreated,
							frequency: Frequency.Annual,
							month: 7,
						},
						{
							createdAt: new Date('2024-07-02T15:00:00.000Z'),
							operationType: OperationType.ReminderUpdated,
							frequency: Frequency.Annual,
							cost: 200,
							month: 7,
						},
					])
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
							createdAt: new Date('2024-07-02T15:00:00.000Z'),
							operationType: OperationType.ReminderCreated,
							frequency: Frequency.Annual,
							month: 7,
						},
						{
							createdAt: new Date('2024-09-02T15:00:00.000Z'),
							operationType: OperationType.ReminderUpdated,
							frequency: Frequency.Annual,
							month: 7,
							cost: 200,
						},
					])
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
							createdAt: new Date('2024-07-02T15:00:00.000Z'),
							operationType: OperationType.ReminderCreated,
							frequency: Frequency.Annual,
							month: 7,
						},
						{
							createdAt: new Date('2025-09-02T15:00:00.000Z'),
							operationType: OperationType.ReminderUpdated,
							frequency: Frequency.Annual,
							month: 7,
							cost: 200,
						},
					])
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
							createdAt: new Date('2024-07-02T15:00:00.000Z'),
							operationType: OperationType.ReminderCreated,
							frequency: Frequency.Annual,
							month: 7,
						},
						{
							createdAt: new Date('2024-09-02T15:00:00.000Z'),
							operationType: OperationType.ReminderUpdated,
							frequency: Frequency.Annual,
							month: 7,
							cost: 200,
						},
					])
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
							createdAt: new Date('2024-07-02T15:00:00.000Z'),
							operationType: OperationType.ReminderCreated,
							frequency: Frequency.Annual,
							month: 7,
						},
						{
							createdAt: new Date('2025-09-02T15:00:00.000Z'),
							operationType: OperationType.ReminderUpdated,
							frequency: Frequency.Annual,
							month: 7,
							cost: 200,
						},
					])
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
							createdAt: new Date('2024-07-02T15:00:00.000Z'),
							operationType: OperationType.ReminderCreated,
							type: Type.Single,
							month: 7,
						},
						{
							createdAt: new Date('2024-09-02T15:00:00.000Z'),
							operationType: OperationType.ReminderUpdated,
							type: Type.Single,
							month: 7,
							cost: 200,
						},
					])
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
							createdAt: new Date('2024-07-02T15:00:00.000Z'),
							operationType: OperationType.ReminderCreated,
							type: Type.Single,
							month: 7,
						},
						{
							createdAt: new Date('2024-09-02T15:00:00.000Z'),
							operationType: OperationType.ReminderUpdated,
							type: Type.Single,
							month: 7,
							cost: 200,
						},
					])
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
							createdAt: new Date('2024-08-15T15:00:00.000Z'),
							operationType: OperationType.ReminderCreated,
						},
						{
							createdAt: new Date('2024-10-15T15:00:00.000Z'),
							cost: 200,
							operationType: OperationType.ReminderUpdated,
						},
						{
							createdAt: new Date('2024-10-15T15:00:00.000Z'),
							cost: 200,
							categoryId: 5,
							operationType: OperationType.ReminderUpdated,
						},
					])
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
							createdAt: new Date('2024-08-15T15:00:00.000Z'),
							operationType: OperationType.ReminderCreated,
						},
						{
							createdAt: new Date('2024-10-15T15:00:00.000Z'),
							cost: 200,
							operationType: OperationType.ReminderUpdated,
						},
						{
							createdAt: new Date('2024-10-15T15:00:00.000Z'),
							cost: 200,
							categoryId: 5,
							operationType: OperationType.ReminderUpdated,
						},
					])
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
							createdAt: new Date('2024-08-15T15:00:00.000Z'),
							operationType: OperationType.ReminderCreated,
						},
						{
							createdAt: new Date('2024-10-15T15:00:00.000Z'),
							cost: 200,
							operationType: OperationType.ReminderUpdated,
						},
						{
							createdAt: new Date('2024-11-15T15:00:00.000Z'),
							cost: 200,
							operationType: OperationType.ReminderUpdated,
							autoRenewal: false,
						},
					])
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
							createdAt: new Date('2024-08-15T15:00:00.000Z'),
							operationType: OperationType.ReminderCreated,
						},
						{
							createdAt: new Date('2024-10-15T15:00:00.000Z'),
							cost: 200,
							operationType: OperationType.ReminderUpdated,
						},
						{
							createdAt: new Date('2024-11-15T15:00:00.000Z'),
							cost: 200,
							operationType: OperationType.ReminderUpdated,
							autoRenewal: false,
						},
					])
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
							createdAt: new Date('2024-08-15T15:00:00.000Z'),
							operationType: OperationType.ReminderCreated,
						},
						{
							createdAt: new Date('2024-10-15T15:00:00.000Z'),
							cost: 200,
							operationType: OperationType.ReminderUpdated,
						},
						{
							createdAt: new Date('2025-02-15T15:00:00.000Z'),
							cost: 200,
							operationType: OperationType.ReminderUpdated,
							autoRenewal: false,
						},
					])
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
							createdAt: new Date('2024-08-15T15:00:00.000Z'),
							operationType: OperationType.ReminderCreated,
							frequency: Frequency.Annual,
							month: 8,
						},
						{
							createdAt: new Date('2024-10-15T15:00:00.000Z'),
							cost: 200,
							operationType: OperationType.ReminderUpdated,
							frequency: Frequency.Annual,
							month: 8,
						},
						{
							createdAt: new Date('2024-11-15T15:00:00.000Z'),
							cost: 200,
							operationType: OperationType.ReminderUpdated,
							frequency: Frequency.Annual,
							month: 8,
							autoRenewal: false,
						},
					])
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
							createdAt: new Date('2024-08-15T15:00:00.000Z'),
							operationType: OperationType.ReminderCreated,
							frequency: Frequency.Annual,
							month: 8,
						},
						{
							createdAt: new Date('2024-10-15T15:00:00.000Z'),
							cost: 200,
							operationType: OperationType.ReminderUpdated,
							frequency: Frequency.Annual,
							month: 8,
						},
						{
							createdAt: new Date('2024-11-15T15:00:00.000Z'),
							cost: 200,
							operationType: OperationType.ReminderUpdated,
							frequency: Frequency.Annual,
							month: 8,
							autoRenewal: false,
						},
					])
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
							createdAt: new Date('2024-08-15T15:00:00.000Z'),
							operationType: OperationType.ReminderCreated,
							frequency: Frequency.Annual,
							month: 8,
						},
						{
							createdAt: new Date('2024-10-15T15:00:00.000Z'),
							cost: 200,
							operationType: OperationType.ReminderUpdated,
							frequency: Frequency.Annual,
							month: 8,
						},
						{
							createdAt: new Date('2025-04-15T15:00:00.000Z'),
							cost: 200,
							operationType: OperationType.ReminderUpdated,
							frequency: Frequency.Annual,
							month: 8,
							autoRenewal: false,
						},
					])
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
				createdAt: new Date('2024-06-17T15:00:00.000Z'),
				startedAt: new Date('2024-07-15T15:00:00.000Z'),
				operationType: OperationType.ReminderCreated,
				month: 7,
				type: Type.Single,
				categoryId: 9,
			},
			{
				createdAt: new Date('2024-09-15T15:00:00.000Z'),
				cost: 200,
				operationType: OperationType.ReminderUpdated,
				type: Type.Single,
				month: 7,
				categoryId: 9,
			},
			{
				reminderId: 5,
				createdAt: new Date('2024-08-17T15:00:00.000Z'),
				startedAt: new Date('2024-09-15T15:00:00.000Z'),
				cost: 100,
				operationType: OperationType.ReminderCreated,
			},
			{
				reminderId: 6,
				createdAt: new Date('2024-03-17T15:00:00.000Z'),
				startedAt: new Date('2024-04-15T15:00:00.000Z'),
				month: 4,
				cost: 100,
				frequency: Frequency.Annual,
				operationType: OperationType.ReminderCreated,
			},
		]);
		it('data for 2024', () => {
			const result = calculateGraphData(2024, reminderEvents);
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
			const result = calculateGraphData(2025, reminderEvents);
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
