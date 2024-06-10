import type { Locator, Page } from '@playwright/test';

const { PLAYWRIGHT_USERNAME } = process.env;

export class Dashboard {
	readonly page: Page;
	readonly name: string;
	readonly pageTitle: Locator;
	readonly username: Locator;
	readonly firstCategory: Locator;
	readonly secondCategory: Locator;
	readonly menuButton: Locator;
	readonly addCategory: Locator;
	readonly addModalTitle: Locator;
	readonly secondCategoryEdit: Locator;
	readonly secondOptionsButton: Locator;
	readonly secondEditButton: Locator;
	readonly secondDeleteButton: Locator;
	readonly editModalTitle: Locator;
	readonly deleteModalTitle: Locator;
	readonly deleteModalButton: Locator;

	constructor(page: Page, isMobile: boolean) {
		this.name = isMobile ? 'Second Mobile' : 'Second';
		this.page = page;
		this.pageTitle = page.getByRole('heading', { level: 1 });
		this.username = page.getByRole('heading', {
			level: 3,
			name: PLAYWRIGHT_USERNAME,
		});
		this.firstCategory = page.getByRole('link', { name: 'First' });
		this.secondCategory = page.getByRole('link', {
			name: this.name + ' (0)',
			exact: true,
		});
		this.menuButton = page.getByRole('button', { name: 'Menu button' });
		this.addCategory = page.getByRole('button', { name: 'Add a category' });
		this.addModalTitle = page.getByRole('heading', {
			level: 2,
			name: 'Add a new category',
		});
		this.secondCategoryEdit = page.getByRole('link', {
			name: this.name + ' edit (0)',
			exact: true,
		});
		this.secondOptionsButton = page.getByRole('button', {
			name: 'Options for ' + this.name,
		});
		this.secondEditButton = page.getByRole('button', {
			name: 'Edit ' + this.name,
		});
		this.secondDeleteButton = page.getByRole('button', {
			name: 'Delete ' + this.name,
		});
		this.editModalTitle = page.getByRole('heading', {
			level: 2,
			name: `Edit your ${this.name} category`,
		});
		this.deleteModalTitle = page.getByRole('heading', {
			level: 2,
			name: `Are you sure you want to delete the ${this.name} Edit category?`,
		});
		this.deleteModalButton = page.getByRole('button', { name: 'Yes delete' });
	}

	async goto() {
		await this.page.goto('/', {
			waitUntil: 'domcontentloaded',
		});
	}

	async addCategoryForm() {
		await this.page
			.getByRole('textbox', { name: 'Category name' })
			.fill(this.name);
		await this.page.locator('label').filter({ hasText: 'break icon' }).click();

		await this.page.getByRole('button', { name: 'Add category' }).click();
	}

	async editCategoryForm() {
		await this.page
			.getByRole('textbox', { name: 'Rename category' })
			.fill(this.name + ' edit');
		await this.page.locator('label').filter({ hasText: 'die icon' }).click();

		await this.page.getByRole('button', { name: 'Change category' }).click();
	}
}
