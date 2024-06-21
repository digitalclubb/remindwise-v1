import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { Help } from './pom/help';

let help: Help;
test.describe('Help page', () => {
	test.beforeEach(async ({ page }) => {
		help = new Help(page);
		await help.goto();
	});

	test(
		'has correct title',
		{
			tag: '@functional',
		},
		async () => {
			await expect(help.pageTitle).toHaveText('Help');
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
