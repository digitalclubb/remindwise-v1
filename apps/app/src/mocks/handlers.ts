import { getCategories } from './handlers/getCategories';
import { getReminder } from './handlers/getReminder';
import { getReminders } from './handlers/getReminders';
import { getSettings } from './handlers/getSettings';

export const handlers = [getCategories, getReminder, getReminders, getSettings];
