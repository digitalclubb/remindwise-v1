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
		setupFiles: '../vitest.setup.ts',
		onConsoleLog(log) {
			if (process.env.CI) {
				// Any test logging must contain the string: 'test'
				if (log.includes('test')) return false;

				throw new Error(`the console has the following log - \n\n${log}`);
			}
		},
	},
};

export default config;
