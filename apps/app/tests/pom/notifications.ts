import type { Locator, Page } from '@playwright/test';

export class Notifications {
	readonly page: Page;
	readonly pageTitle: Locator;

	constructor(page: Page) {
		this.page = page;
		this.pageTitle = page.getByRole('heading', { level: 1 });
	}

	async goto() {
		await this.page.goto('/notifications');
	}
}
