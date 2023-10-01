import { sveltekit } from '@sveltejs/kit/vite';
import { vitePluginGraphqlLoader } from 'vite-plugin-graphql-loader';
import houdini from 'houdini/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [houdini(), sveltekit(), vitePluginGraphqlLoader()],
};

export default config;
