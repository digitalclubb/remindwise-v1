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

	test('@functional has correct title', async () => {
		await expect(login.pageTitle).toHaveText('Login to your account');
	});

	test('has no @accessibility violations', async ({ page }) => {
		const results = await new AxeBuilder({ page }).analyze();
		expect(results.violations).toEqual([]);
	});
});

/*
I can login
I can see my reminders
I can edit a reminder
I can delete a reminder
I can add a reminder
I can see my categories
I can edit a category
I can delete a category
I can add a category
I can update my settings
*/
