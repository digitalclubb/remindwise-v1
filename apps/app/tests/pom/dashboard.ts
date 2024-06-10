import type { Locator, Page } from '@playwright/test';

const { PLAYWRIGHT_USERNAME } = process.env;

export class Dashboard {
	readonly page: Page;
	readonly pageTitle: Locator;
	readonly username: Locator;
	readonly firstCategory: Locator;
	readonly secondCategory: Locator;
	readonly menuButton: Locator;
	readonly addCategory: Locator;
	readonly addModalTitle: Locator;

	constructor(page: Page) {
		this.page = page;
		this.pageTitle = page.getByRole('heading', { level: 1 });
		this.username = page.getByRole('heading', {
			level: 3,
			name: PLAYWRIGHT_USERNAME,
		});
		this.firstCategory = page.getByRole('link', { name: 'First' });
		this.secondCategory = page.getByRole('link', { name: 'Second' });
		this.menuButton = page.getByRole('button', { name: 'Menu button' });
		this.addCategory = page.getByRole('button', { name: 'Add a category' });
		this.addModalTitle = page.getByRole('heading', {
			level: 2,
			name: 'Add a new category',
		});
	}

	async goto() {
		await this.page.goto('/');
	}
}
