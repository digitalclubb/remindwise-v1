import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
	testDir: './tests',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	timeout: 60000,
	reporter: [['html', { open: 'never' }]],
	projects: [
		{ name: 'setup', testMatch: /.*\.setup\.ts/ },
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
				storageState: 'playwright/.auth/user.json',
			},

			dependencies: ['setup'],
		},
		{
			name: 'Mobile Safari',
			use: {
				...devices['iPhone 12'],
				storageState: 'playwright/.auth/user.json',
			},
			dependencies: ['setup'],
		},
	],
	use: {
		trace: 'on-first-retry',
		baseURL: 'http://localhost:4174',
	},
	webServer: {
		command: 'pnpm preview',
		url: 'http://localhost:4174',
		reuseExistingServer: !process.env.CI,
	},
});
