import { getAllReminders } from './handlers/getAllReminders';
import { getCategories } from './handlers/getCategories';
import { getHistorical } from './handlers/getHistorical';
import { getReminder } from './handlers/getReminder';
import { getReminders } from './handlers/getReminders';
import { getSettings } from './handlers/getSettings';

export const handlers = [
	getAllReminders,
	getCategories,
	getHistorical,
	getReminder,
	getReminders,
	getSettings,
];
