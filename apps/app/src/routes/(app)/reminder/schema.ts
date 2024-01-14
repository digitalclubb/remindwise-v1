import { Frequency, Type } from '@graphql/types';
import { z } from 'zod';

export const reminderSchema = z
	.object({
		categoryId: z.string(),
		userId: z.string(),
		category: z.string().min(1, 'Category is required'),
		name: z.string().min(1, 'Reminder name is required'),
		type: z.nativeEnum(Type, {
			required_error: 'Select the type of your reminder',
		}),
		company: z.string().min(1, 'Company is required'),
		cost: z.number().min(1, 'Cost is required'),
		frequency: z.nativeEnum(Frequency).optional(),
		date: z.string().optional(),
		autoRenew: z.boolean().optional(),
		notes: z.string().optional(),
	})
	.superRefine((data, ctx) => {
		if (data.type === 'ONGOING' && !data.frequency)
			ctx.addIssue({
				path: ['frequency'],
				code: 'custom',
				message: 'Select the frequency of your reminder',
			});
	});
