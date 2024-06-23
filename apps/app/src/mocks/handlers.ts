// Queries
import { getCategories } from './handlers/getCategories';
import { getReminder } from './handlers/getReminder';
import { getReminders } from './handlers/getReminders';
import { getSettings } from './handlers/getSettings';

// Mutations
import { updateSettings } from './handlers/updateSettings';
import { updateReminder } from './handlers/updateReminder';
import { updateCategory } from './handlers/updateCategory';
import { deleteReminder } from './handlers/deleteReminder';
import { deleteCategory } from './handlers/deleteCategory';
import { addReminder } from './handlers/addReminder';
import { addCategory } from './handlers/addCategory';

export const handlers = [
    getCategories, 
    getReminder, 
    getReminders, 
    getSettings, 
    updateSettings, 
    updateReminder,
    updateCategory,
    deleteReminder,
    deleteCategory,
    addReminder,
    addCategory
];
