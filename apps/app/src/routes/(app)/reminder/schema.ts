import { z } from 'zod';

// Name has a default value just to display something in the form.
export const reminderSchema = z.object({
	categoryId: z.string(),
	category: z.string().min(1, 'Category is required'),
	name: z.string().min(1, 'Reminder name is required'),
	type: z.string(),
});
