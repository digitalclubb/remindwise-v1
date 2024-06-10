import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

import { Dashboard } from './pom/dashboard';
const { PLAYWRIGHT_USERNAME, PLAYWRIGHT_PASSWORD } = process.env;

let dashboard: Dashboard;

// test.use({ storageState: { cookies: [], origins: [] } });
test.describe('Dashboard page', () => {
	test.beforeEach(async ({ page }) => {
		dashboard = new Dashboard(page);
		await dashboard.goto();
		await page.getByRole('heading', { level: 1, name: 'Dashboard' }).waitFor();
	});

	test('@functional page loads correctly', async () => {
		await expect(dashboard.pageTitle).toHaveText('Dashboard');
		await expect(dashboard.username).toBeVisible();
		await expect(dashboard.firstCategory).toBeVisible();
	});

	test.only('@functional I can add, edit and delete a category', async ({
		page,
		isMobile,
	}) => {
		// await page.goto('/login', { waitUntil: 'domcontentloaded' });

		// await page.getByText('Login to your account').waitFor();

		// await page.getByLabel('Email').fill(PLAYWRIGHT_USERNAME as string);
		// await page.getByLabel('Password').fill(PLAYWRIGHT_PASSWORD as string);
		// await page.getByRole('button', { name: 'Login' }).click();

		// await page.getByRole('heading', { level: 1, name: 'Dashboard' }).waitFor();

		if (isMobile) {
			await dashboard.menuButton.click();
		}

		await page.getByRole('button', { name: 'Add a category' }).click();

		await page
			.getByRole('heading', {
				level: 2,
				name: 'Add a new category',
			})
			.waitFor();

		await page.pause();
		await page.getByRole('textbox', { name: 'Category name' }).fill('Second');
		console.log(page.getByRole('radio', { name: 'break icon' }));
		console.log(page.getByRole('radio', { name: 'break icon' }).check);
		await page.getByRole('radio', { name: /break/ }).focus();
		await page.getByRole('radio', { name: /break/ }).click({ force: true });

		await page.getByRole('button', { name: 'Add category' }).click();

		await expect(dashboard.addModalTitle).not.toBeVisible();
		await expect(dashboard.secondCategory).toBeVisible();
	});

	test('has no @accessibility violations', async ({ page }) => {
		const results = await new AxeBuilder({ page }).analyze();
		expect(results.violations).toEqual([]);
	});
});
