import { test, expect } from '@playwright/test';
import { Register } from './pom/register';

test('has title', async ({ page }) => {
	const register = new Register(page);
	await register.goto();
	await expect(register.pageTitle).toHaveText('Register');
});
