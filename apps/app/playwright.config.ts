import config from '../../playwright.config';
export default {
	...config,
	use: {
		...config.use,
		baseURL: 'http://localhost:4174',
	},
	webServer: {
		...config.webServer,
		url: 'http://localhost:4174',
	},
};
