export const getURL = () => {
	console.log('process.env.VERCEL_URL', process?.env?.VERCEL_URL);
	console.log(
		'process.env.VERCEL_PROJECT_PRODUCTION_URL',
		process?.env?.VERCEL_PROJECT_PRODUCTION_URL
	);
	let url =
		process?.env?.VERCEL_PROJECT_PRODUCTION_URL ?? // Set this to your site URL in production env.
		process?.env?.VERCEL_URL ?? // Automatically set by Vercel.
		'http://localhost:3000/';
	// Make sure to include `https://` when not localhost.
	url = url.startsWith('http') ? url : `https://${url}`;
	// Make sure to include a trailing `/`.
	url = url.endsWith('/') ? url : `${url}/`;
	return url;
};
