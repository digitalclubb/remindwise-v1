import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { Notifications } from './pom/notifications';

let notifications: Notifications;
test.describe('Notifications page', () => {
	test.beforeEach(async ({ page }) => {
		notifications = new Notifications(page);
		await notifications.goto();
	});

	test(
		'has correct title',
		{
			tag: '@functional',
		},
		async () => {
			await expect(notifications.pageTitle).toHaveText('Notifications');
		}
	);

	test(
		'has no accessibility violations and is visually correct',
		{
			tag: ['@accessibility', '@visual']
		},
		async ({ page }) => {
			const results = await new AxeBuilder({ page }).analyze();
			expect(results.violations).toEqual([]);

			await expect(page).toHaveScreenshot({
				fullPage: true,
			});
		}
	);
});
