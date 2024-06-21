import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { Reminder } from './pom/reminder';

let reminder: Reminder;
test.describe('Reminder page', () => {
	test.beforeEach(async ({ page }) => {
		reminder = new Reminder(page);
		await reminder.goto();
	});

	test(
		'has correct title',
		{
			tag: '@functional',
		},
		async () => {
			await expect(reminder.pageTitle).toHaveText('Example 1');
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
