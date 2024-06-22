import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { Category } from './pom/category';

let category: Category;
test.describe('Category page', () => {
	test.beforeEach(async ({ page }) => {
		category = new Category(page);
		await category.goto();
	});

	test(
		'has correct title',
		{
			tag: '@functional',
		},
		async () => {
			await expect(category.pageTitle).toHaveText('Example 1');
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

	test(
		'has visual test',
		{
			tag: '@visual',
		},
		async ({ page }) => {
			await expect(page).toHaveScreenshot({
				fullPage: true,
			});
		}
	);
});
