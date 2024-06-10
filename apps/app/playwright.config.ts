import { devices } from '@playwright/test';
import config from '../../playwright.config';
import dotenv from 'dotenv';

dotenv.config();

export default {
	...config,
	projects: [
		{ name: 'setup', testMatch: /.*\.setup\.ts/ },
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
				storageState: './playwright/.auth/user.json',
			},

			dependencies: ['setup'],
		},
		{
			name: 'Mobile Safari',
			use: {
				...devices['iPhone 12'],
				storageState: './playwright/.auth/user.json',
			},
			dependencies: ['setup'],
		},
	],
	use: {
		...config.use,
		baseURL: 'http://localhost:4174',
	},
	webServer: {
		...config.webServer,
		url: 'http://localhost:4174',
	},
};
