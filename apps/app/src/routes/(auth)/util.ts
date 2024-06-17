export const getURL = () => {
	let url = '';
	switch (process?.env?.VERCEL_ENV) {
		case 'production':
			url = process?.env?.VERCEL_PROJECT_PRODUCTION_URL ?? '';
			break;
		case 'preview':
			url = process?.env?.VERCEL_URL ?? '';
			break;
		default:
			url = 'http://localhost:3000/';
	}

	url = url.startsWith('http') ? url : `https://${url}`;
	url = url.endsWith('/') ? url : `${url}/`;
	return url;
};
