import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { Homepage } from './pom/homepage';

let homepage: Homepage;

test.describe('Homepage', () => {
	test.beforeEach(async ({ page }) => {
		homepage = new Homepage(page);
		await homepage.goto();
	});

	test(
		'has correct title',
		{
			tag: '@functional',
		},
		async () => {
			await expect(homepage.emailInput).toBeVisible();
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
