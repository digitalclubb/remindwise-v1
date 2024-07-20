import { describe, expect, it } from "vitest";
import { calculateGraphData, Frequency, OperationType, Type } from "./graphs";

describe("graphs", () => {
  describe("reminders that only have 1 created event history", () => {
    it("data for 2024 of a monthly reminder that started in Feb", () => {
      const result = calculateGraphData(2024, [
        {
          id: 12345,
          userId: 12345,
          reminderId: 3,
          startedAt: new Date("2024-02-15T15:00:00.000Z"),
          categoryId: 9,
          frequency: Frequency.Monthly,
          cost: 100,
          operationType: OperationType.ReminderCreated,
          autoRenewal: true,
          type: Type.Ongoing,
        },
      ]);
      expect(result).toEqual(
        new Map([
          ["1", 0],
          ["2", 100],
          ["3", 100],
          ["4", 100],
          ["5", 100],
          ["6", 100],
          ["7", 100],
          ["8", 100],
          ["9", 100],
          ["10", 100],
          ["11", 100],
          ["12", 100],
        ]),
      );
    });

	it("data for 2025 of a monthly reminder that started in Feb of 2024", () => {
		const result = calculateGraphData(2025, [
		  {
			id: 12345,
			userId: 12345,
			reminderId: 3,
			startedAt: new Date("2024-02-15T15:00:00.000Z"),
			categoryId: 9,
			frequency: Frequency.Monthly,
			cost: 100,
			operationType: OperationType.ReminderCreated,
			autoRenewal: true,
			type: Type.Ongoing,
		  },
		]);
		expect(result).toEqual(
		  new Map([
			["1", 100],
			["2", 100],
			["3", 100],
			["4", 100],
			["5", 100],
			["6", 100],
			["7", 100],
			["8", 100],
			["9", 100],
			["10", 100],
			["11", 100],
			["12", 100],
		  ]),
		);
	  });

	  it("data for 2024 of a yearly reminder that started in June", () => {
		const result = calculateGraphData(2024, [
		  {
			id: 12345,
			userId: 12345,
			reminderId: 5,
			startedAt: new Date("2024-06-02T15:00:00.000Z"),
			categoryId: 9,
			frequency: Frequency.Yearly,
			cost: 100,
			operationType: OperationType.ReminderCreated,
			autoRenewal: true,
			type: Type.Ongoing,
			},
		]);
		expect(result).toEqual(
		  new Map([
			["1", 0],
			["2", 0],
			["3", 0],
			["4", 0],
			["5", 0],
			["6", 100],
			["7", 0],
			["8", 0],
			["9", 0],
			["10", 0],
			["11", 0],
			["12", 0],
		  ]),
		);
	  });

	  it("data for 2025 of a yearly reminder that started in June of 2024", () => {
		const result = calculateGraphData(2025, [
		  {
			id: 12345,
			userId: 12345,
			reminderId: 5,
			startedAt: new Date("2024-06-02T15:00:00.000Z"),
			categoryId: 9,
			frequency: Frequency.Yearly,
			cost: 100,
			operationType: OperationType.ReminderCreated,
			autoRenewal: true,
			type: Type.Ongoing,
			},
		]);
		expect(result).toEqual(
		  new Map([
			["1", 0],
			["2", 0],
			["3", 0],
			["4", 0],
			["5", 0],
			["6", 100],
			["7", 0],
			["8", 0],
			["9", 0],
			["10", 0],
			["11", 0],
			["12", 0],
		  ]),
		);
	  });



	  it("data for 2024 of a single reminder that happened in July", () => {
		const result = calculateGraphData(2024, [
		  {
			id: 12345,
			userId: 12345,
			reminderId: 5,
			startedAt: new Date("2024-07-02T15:00:00.000Z"),
			categoryId: 9,
			frequency: Frequency.Yearly,
			cost: 100,
			operationType: OperationType.ReminderCreated,
			autoRenewal: false,
			type: Type.Single,
			},
		]);
		expect(result).toEqual(
		  new Map([
			["1", 0],
			["2", 0],
			["3", 0],
			["4", 0],
			["5", 0],
			["6", 0],
			["7", 100],
			["8", 0],
			["9", 0],
			["10", 0],
			["11", 0],
			["12", 0],
		  ]),
		);
	  });

	  it("data for 2025 of a yearly reminder that happened in July of 2024", () => {
		const result = calculateGraphData(2025, [
		  {
			id: 12345,
			userId: 12345,
			reminderId: 5,
			startedAt: new Date("2024-07-02T15:00:00.000Z"),
			categoryId: 9,
			frequency: Frequency.Yearly,
			cost: 100,
			operationType: OperationType.ReminderCreated,
			autoRenewal: false,
			type: Type.Single,
			},
		]);
		expect(result).toEqual(
		  new Map([
			["1", 0],
			["2", 0],
			["3", 0],
			["4", 0],
			["5", 0],
			["6", 0],
			["7", 0],
			["8", 0],
			["9", 0],
			["10", 0],
			["11", 0],
			["12", 0],
		  ]),
		);
	  });
  });
});
