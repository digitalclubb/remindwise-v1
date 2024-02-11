import { Currency, Interval } from '@graphql/types';
import { z } from 'zod';

export const settingsSchema = z.object({
	id: z.string(),
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	email: z
		.string()
		.min(1, 'Last name is required')
		.email('This is not a valid email'),
	interval: z.nativeEnum(Interval).optional(),
	currency: z.nativeEnum(Currency).optional(),
	noticePeriod: z.number(),
});

export const updatePasswordSchema = z.object({
	password: z.string().min(1, 'New password is required'),
});
