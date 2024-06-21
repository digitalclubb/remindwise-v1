import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { Settings } from './pom/settings';

let settings: Settings;
test.describe('Settings page', () => {
	test.beforeEach(async ({ page }) => {
		settings = new Settings(page);
		await settings.goto();
	});

	test(
		'has correct title',
		{
			tag: '@functional',
		},
		async () => {
			await expect(settings.pageTitle).toHaveText('Settings');
		}
	);

	test(
		'has no accessibility violations and is visually correct',
		{
			tag: ['@accessibility', '@visual'],
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
