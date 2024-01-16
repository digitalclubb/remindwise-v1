import { z } from 'zod';

export const forgotPasswordSchema = z.object({
	email: z
		.string()
		.min(1, { message: 'This field is required' })
		.email('This is not a valid email'),
});
