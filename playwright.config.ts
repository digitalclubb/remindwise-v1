import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './tests',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	timeout: 60000,
	reporter: [['html', { open: 'never' }]],
	snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}__{projectName}{ext}',
	use: {
		screenshot: 'only-on-failure',
		trace: 'retain-on-failure',
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
		{
			name: 'Mobile Safari',
			use: { ...devices['iPhone 12'] },
		},
	],
	webServer: {
		command: 'pnpm preview',
		reuseExistingServer: !process.env.CI,
	},
});
