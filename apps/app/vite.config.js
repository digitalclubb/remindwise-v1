import { sveltekit } from '@sveltejs/kit/vite';
import { vitePluginGraphqlLoader } from 'vite-plugin-graphql-loader';
import houdini from 'houdini/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [houdini(), sveltekit(), vitePluginGraphqlLoader()],
	test: {
		globals: true,
		include: ['**/*.{test,spec}.ts'],
		exclude: ['**/node_modules/**', '**/tests/**'],
		environment: 'jsdom',
		setupFiles: './vitest.setup.ts',
	},
	resolve: {
		alias: {
			'msw/browser': './node_modules/msw/lib/browser/index.mjs',
		},
	},
};

export default config;
