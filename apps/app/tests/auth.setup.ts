import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

const { USERNAME, PASSWORD } = process.env;

setup('authenticate', async ({ page }) => {
	await page.goto('/login');
	await page.getByLabel('Email').fill(USERNAME as string);
	await page.getByLabel('Password').fill(PASSWORD as string);
	await page.getByRole('button', { name: 'Login' }).click();

	await expect(
		page.getByRole('heading', { level: 1, name: 'Dashboard' })
	).toBeVisible();

	await page.context().storageState({ path: authFile });
});
