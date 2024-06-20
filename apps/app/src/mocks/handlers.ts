import { getAllReminders } from './handlers/getAllReminders';
import { getCategories } from './handlers/getCategories';
import { getReminder } from './handlers/getReminder';
import { getReminders } from './handlers/getReminders';
import { getSettings } from './handlers/getSettings';

export const handlers = [
	getAllReminders,
	getCategories,
	getReminder,
	getReminders,
	getSettings,
];
