import { Frequency, Type } from '@graphql/types';
import { z } from 'zod';

export const editReminderSchema = z.object({
	categoryId: z.string(),
	userId: z.string(),
	category: z.string().min(1, 'Category is required'),
	name: z.string().min(1, 'Reminder name is required'),
	type: z.nativeEnum(Type, {
		required_error: 'Select the type of your reminder',
	}),
	cost: z.number().min(1, 'Cost is required'),
	frequency: z.nativeEnum(Frequency).optional(),
	date: z.string().optional(),
	day: z.number().optional(),
	month: z.number().optional(),
	autoRenew: z.boolean().optional(),
	notes: z.string().optional(),
});

export const addReminderSchema = editReminderSchema.superRefine((data, ctx) => {
	if (data.type === 'ONGOING' && !data.frequency) {
		ctx.addIssue({
			path: ['frequency'],
			code: 'custom',
			message: 'Select the frequency of your reminder',
		});
	}

	if (data.type === 'ONGOING' && data.frequency === 'ANNUAL') {
		if (!data.day) {
			ctx.addIssue({
				path: ['day'],
				code: 'custom',
				message: 'Day is required',
			});
		}
		if (!data.month) {
			ctx.addIssue({
				path: ['month'],
				code: 'custom',
				message: 'Month is required',
			});
		}
	} else if (data.type === 'ONGOING' && !data.day) {
		ctx.addIssue({
			path: ['day'],
			code: 'custom',
			message: 'Day is required',
		});
	}
});
