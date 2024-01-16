import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extends: './.svelte-kit/tsconfig.json',
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess()],

	kit: {
		adapter: adapter(),
		alias: {
			'@graphql': 'src/graphql',
			$houdini: path.resolve('.', '$houdini'),
		},
	},
};

export default config;
