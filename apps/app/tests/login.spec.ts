import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { Login } from './pom/login';

let login: Login;
test.use({ storageState: { cookies: [], origins: [] } });
test.describe('Login page', () => {
	test.beforeEach(async ({ page }) => {
		login = new Login(page);
		await login.goto();
	});

	test('has correct title', {
		tag: '@functional',
	  }, async () => {
		await expect(login.pageTitle).toHaveText('Login to your account');
	});

	test('has no accessibility violations', {
		tag: '@accessibility',
	  }, async ({ page }) => {
		const results = await new AxeBuilder({ page }).analyze();
		expect(results.violations).toEqual([]);
	});
});
