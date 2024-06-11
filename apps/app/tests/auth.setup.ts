import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

const { PLAYWRIGHT_USERNAME, PLAYWRIGHT_PASSWORD } = process.env;

setup('authenticate', async ({ page }) => {
	await page.goto('/login', { waitUntil: 'domcontentloaded' });

	await page.getByText('Login to your account').waitFor();

	await page.getByLabel('Email').fill(PLAYWRIGHT_USERNAME as string);
	await page.getByLabel('Password').fill(PLAYWRIGHT_PASSWORD as string);
	await page.getByRole('button', { name: 'Login' }).click();

	await page.getByRole('heading', { level: 1, name: 'Dashboard' }).waitFor();

	await page.context().storageState({ path: authFile });
});
