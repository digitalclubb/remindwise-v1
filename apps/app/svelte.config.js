import adapter from '@sveltejs/adapter-vercel';
import { sveltePreprocess } from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extends: './.svelte-kit/tsconfig.json',
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [sveltePreprocess()],

	kit: {
		adapter: adapter(),
		alias: {
			'@graphql': 'src/graphql',
			$houdini: path.resolve('.', '$houdini'),
			$mocks: path.resolve('src/mocks'),
		},
	},
};

export default config;
