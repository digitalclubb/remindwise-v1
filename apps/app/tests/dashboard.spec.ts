import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

import { Dashboard } from './pom/dashboard';

let dashboard: Dashboard;

test.describe('Dashboard page', () => {
	test.beforeEach(async ({ page, isMobile }) => {
		dashboard = new Dashboard(page, isMobile);
		await dashboard.goto();
		await page.getByRole('heading', { level: 1, name: 'Dashboard' }).waitFor();
	});

	test(
		'page loads correctly',
		{
			tag: '@functional',
		},
		async () => {
			await expect(dashboard.pageTitle).toHaveText('Dashboard');
			await expect(dashboard.username).toBeVisible();
			await expect(dashboard.firstCategory).toBeVisible();
			await expect(dashboard.tableRow1).toBeVisible();
			await expect(dashboard.tableRow2).toBeVisible();
			await expect(dashboard.tableRow3).toBeVisible();
		}
	);

	// This test is failing because we haven't mocked the mutations
	// eslint-disable-next-line playwright/no-skipped-test
	test.skip(
		'I can add, edit and delete a category',
		{
			tag: '@functional',
		},
		async ({ isMobile }) => {
			if (isMobile) {
				await dashboard.menuButton.click();
			}

			/** Add */
			await dashboard.addCategory.click();

			await dashboard.addModalTitle.waitFor();

			await dashboard.addCategoryForm();

			await expect(dashboard.addModalTitle).toBeHidden();
			await expect(dashboard.secondCategory).toBeVisible();

			/** Edit */
			await Promise.all([
				dashboard.secondCategory.hover(),
				dashboard.secondOptionsButton.click(),
			]);

			await dashboard.secondEditButton.click();

			await dashboard.editModalTitle.waitFor();

			await dashboard.editCategoryForm();
			await expect(dashboard.addModalTitle).toBeHidden();
			await expect(dashboard.secondCategoryEdit).toBeVisible();

			if (isMobile) {
				await dashboard.menuButton.click();
			}

			/** Delete */
			await Promise.all([
				dashboard.secondCategoryEdit.hover(),
				dashboard.secondOptionsButton.click(),
			]);

			await dashboard.secondDeleteButton.click();

			await dashboard.deleteModalTitle.waitFor();

			await dashboard.deleteModalButton.click();

			await expect(dashboard.deleteModalTitle).toBeHidden();
			await expect(dashboard.secondCategoryEdit).toBeHidden();
		}
	);

	test(
		'I can navigate to a reminder page',
		{
			tag: '@functional',
		},
		async () => {
			await dashboard.tableRow1.getByRole('link').click();

			await expect(dashboard.pageTitle).toHaveText(
				'Example reminder Example 1'
			);
		}
	);

	test(
		'I can navigate to the first category page',
		{
			tag: '@functional',
		},
		async ({ isMobile }) => {
			if (isMobile) {
				await dashboard.menuButton.click();
			}

			await dashboard.firstCategory.click();
			await expect(dashboard.pageTitle).toHaveText('Example 1');
		}
	);

	test(
		'I can navigate to add a reminder page',
		{
			tag: '@functional',
		},
		async () => {
			await dashboard.addReminder.click();
			await expect(dashboard.pageTitle).toHaveText('Add a reminder');
		}
	);

	test(
		'I can navigate to settings page',
		{
			tag: '@functional',
		},
		async ({ isMobile }) => {
			if (isMobile) {
				await dashboard.menuButton.click();
			}

			await dashboard.settings.click();
			await expect(dashboard.pageTitle).toHaveText('Settings');
		}
	);

	test(
		'has no accessibility violations',
		{
			tag: '@accessibility',
		},
		async ({ page }) => {
			const results = await new AxeBuilder({ page }).analyze();
			expect(results.violations).toEqual([]);
		}
	);
});
