import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { Homepage } from './pom/homepage';

let homepage: Homepage;

test.describe('Homepage', () => {
	test.beforeEach(async ({ page }) => {
		homepage = new Homepage(page);
		await homepage.goto();
	});

	test('@functional has correct title', async () => {
		await expect(homepage.pageTitle).toHaveText('remindwise.io coming soon');
	});

	test('has no @accessibility violations', async ({ page }) => {
		const results = await new AxeBuilder({ page }).analyze();
		expect(results.violations).toEqual([]);
	});
});
