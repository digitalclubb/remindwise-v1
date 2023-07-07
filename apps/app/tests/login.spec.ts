import { test, expect } from '@playwright/test';
import { Login } from './pom/login';

test('has title', async ({ page }) => {
	const login = new Login(page);
	await login.goto();
	await expect(login.pageTitle).toHaveText('Login');
});
