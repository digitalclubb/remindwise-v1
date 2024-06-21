import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { ReminderForm } from './pom/reminderForm';

let reminderForm: ReminderForm;
test.use({ storageState: { cookies: [], origins: [] } });
test.describe('Notifications page', () => {
	test.beforeEach(async ({ page }) => {
		reminderForm = new ReminderForm(page);
		await reminderForm.goto();
	});

	test(
		'has correct title',
		{
			tag: '@functional',
		},
		async () => {
			await expect(reminderForm.pageTitle).toHaveText('Example 1');
		}
	);

	test(
		'has no accessibility violations',
		{
			tag: '@accessibility',
		},
		async ({ page }) => {
			const results = await new AxeBuilder({ page }).analyze();
			expect(results.violations).toEqual([]);
		}
	);
});
