import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { Contact } from './pom/contact';

let notifications: Contact;
test.describe('Contact page', () => {
	test.beforeEach(async ({ page }) => {
		notifications = new Contact(page);
		await notifications.goto();
	});

	test(
		'has correct title',
		{
			tag: '@functional',
		},
		async () => {
			await expect(notifications.pageTitle).toHaveText('Get in touch');
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
