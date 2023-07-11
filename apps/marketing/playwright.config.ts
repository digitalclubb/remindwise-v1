import config from '../../playwright.config';
export default {
	...config,
	use: {
		...config.use,
		baseURL: 'http://localhost:4173',
	},
	webServer: {
		...config.webServer,
		url: 'http://localhost:4173',
	},
};
