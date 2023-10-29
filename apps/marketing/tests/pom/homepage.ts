import type { Locator, Page } from '@playwright/test';

export class Homepage {
	readonly page: Page;
	readonly emailInput: Locator;

	constructor(page: Page) {
		this.page = page;
		this.emailInput = page.getByPlaceholder('Your email');
	}

	async goto() {
		await this.page.goto('/');
	}
}
