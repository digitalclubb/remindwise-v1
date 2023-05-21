import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [svelte({ hot: !process.env.VITEST })],
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
});
