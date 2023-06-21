import { test, expect } from '@playwright/test';
import { Homepage } from './pom/homepage';

test('has title', async ({ page }) => {
	const homepage = new Homepage(page);
	await homepage.goto();
	await expect(homepage.pageTitle).toHaveText('remindwise.io coming soon');
});
