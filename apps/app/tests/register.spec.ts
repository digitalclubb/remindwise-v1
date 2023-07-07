import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

import { Register } from './pom/register';

let register: Register;

test.describe('Register page', () => {
	test.beforeEach(async ({ page }) => {
		register = new Register(page);
		await register.goto();
	});

	test('@functional has correct title', async () => {
		await expect(register.pageTitle).toHaveText('Register');
	});

	test('has no @accessibility violations', async ({ page }) => {
		const results = await new AxeBuilder({ page }).analyze();
		expect(results.violations).toEqual([]);
	});
});
