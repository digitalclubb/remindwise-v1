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

	test.skip('has no @accessibility violations', async ({ page }) => {
		const results = await new AxeBuilder({ page }).analyze();
		expect(results.violations).toEqual([]);
	});
});
