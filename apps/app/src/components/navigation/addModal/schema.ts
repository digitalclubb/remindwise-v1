import {z} from 'zod';

export const addCategorySchema = z.object({
	category: z
		.string()
		.min(1, { message: 'This field is required' }),
	icon: z.string().min(1, 'This field is required'),
});