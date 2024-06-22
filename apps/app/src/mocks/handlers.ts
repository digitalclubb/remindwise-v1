// Queries
import { getCategories } from './handlers/getCategories';
import { getReminder } from './handlers/getReminder';
import { getReminders } from './handlers/getReminders';
import { getSettings } from './handlers/getSettings';

// Mutations
import { updateSettings } from './handlers/updateSettings';

export const handlers = [getCategories, getReminder, getReminders, getSettings, updateSettings];
