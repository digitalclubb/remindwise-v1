import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

const { USERNAME, PASSWORD } = process.env;

setup('authenticate', async ({ page }) => {
	await page.goto('/login');
	await page.getByLabel('Email').fill(USERNAME as string);
	await page.getByLabel('Password').fill(PASSWORD as string);
	await page.getByRole('button', { name: 'Login' }).click();

	// Alternatively, you can wait until the page reaches a state where all cookies are set.
	await expect(
		page.getByRole('heading', { level: 1, name: 'Dashboard' })
	).toBeVisible();

	// End of authentication steps.

	await page.context().storageState({ path: authFile });
});
