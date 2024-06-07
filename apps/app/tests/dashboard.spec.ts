import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

import { Dashboard } from './pom/dashboard';

let dashboard: Dashboard;

test.describe('Dashboard page', () => {
	test.beforeEach(async ({ page }) => {
		dashboard = new Dashboard(page);
		await dashboard.goto();
	});

	test('@functional page loads correctly', async () => {
		await expect(dashboard.pageTitle).toHaveText('Dashboard');
		await expect(dashboard.username).toBeVisible();
		await expect(dashboard.firstCategory).toBeVisible();
	});

	test.only('@functional I can add, edit and delete a category', async ({page, isMobile}) => {
		await page.setViewportSize({ width: 2000, height: 1000 });
		await page.getByText('adrianaferrugento+qa@gmail.com').waitFor();
        if (isMobile) {
            await dashboard.menuButton.click();
        }
		
		console.log(page.getByRole('button', { name: 'Add a categorys' }))
		await page.getByRole('button', { name: 'Add a categorys' }).click({force: true});
        await dashboard.addModalTitle.waitFor();

		console.log(page.getByRole('textbox', { name: 'Category name' }))
		await page.getByRole('textbox', { name: 'Category name' }).fill('Second');
		console.log(page.getByRole('radio', {name: 'break icon'}))
		console.log(page.getByRole('radio', {name: 'break icon'}).check);
        await page.getByRole('radio', {name: /break/}).focus();
        await page.getByRole('radio', {name: /break/}).click({ force: true });


		await page.getByRole('button', {name: 'Add category'}).click();

		await expect(dashboard.addModalTitle).not.toBeVisible();
		await expect(dashboard.secondCategory).toBeVisible();
	});

	test('has no @accessibility violations', async ({ page }) => {
		const results = await new AxeBuilder({ page }).analyze();
		expect(results.violations).toEqual([]);
	});
});
