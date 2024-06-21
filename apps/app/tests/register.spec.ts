import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

import { Register } from './pom/register';

let register: Register;

test.use({ storageState: { cookies: [], origins: [] } });
test.describe('Register page', () => {
	test.beforeEach(async ({ page }) => {
		register = new Register(page);
		await register.goto();
	});

	test(
		'has correct title',
		{
			tag: '@functional',
		},
		async () => {
			await expect(register.pageTitle).toHaveText('Sign up');
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

	test(
		'has visual test',
		{
			tag: '@visual',
		},
		async ({ page }) => {
			await expect(page).toHaveScreenshot({
				fullPage: true,
			});
		}
	);
});
