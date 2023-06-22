import { sveltekit } from '@sveltejs/kit/vite';
import { vitePluginGraphqlLoader } from 'vite-plugin-graphql-loader';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), vitePluginGraphqlLoader()],
	optimizeDeps: {
		exclude: ['@urql/svelte'],
	},
};

export default config;
