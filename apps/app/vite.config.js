import { sentrySvelteKit } from '@sentry/sveltekit';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePluginGraphqlLoader } from 'vite-plugin-graphql-loader';
import houdini from 'houdini/vite';
import path from 'path';
import { svelteTesting } from '@testing-library/svelte/vite';

/** @type {import('vite').UserConfig} */
const config = {
	build: {
		target: 'esnext',
	},

	plugins: [
		sentrySvelteKit({
			sourceMapsUploadOptions: {
				org: 'remindwise',
				project: 'remindwise',
			},
		}),
		houdini(),
		sveltekit(),
		svelteTesting(),
		vitePluginGraphqlLoader(),
	],

	resolve: {
		alias: [
			{
				find: /msw\/browser/,
				replacement: path.resolve('./node_modules/msw/browser'),
			},
		],
	},

	test: {
		globals: true,
		include: ['**/*.{test,spec}.ts'],
		exclude: ['**/node_modules/**', '**/tests/**'],
		environment: 'jsdom',
		setupFiles: './vitest.setup.ts',
		reporters: ['verbose'],
		chaiConfig: {
			truncateThreshold: 300,
		},
	},
};

export default config;
