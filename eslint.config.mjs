import svelteParser from 'svelte-eslint-parser';
import tsEslint from 'typescript-eslint';
import globals from 'globals';
import eslintJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginSvelte from 'eslint-plugin-svelte';

export default [
	eslintJs.configs.recommended,
	...tsEslint.configs.recommended,
	...eslintPluginSvelte.configs['flat/recommended'],
	eslintConfigPrettier,
	{
		ignores: [
			'!.github',
			'.vscode/',
			'**/node_modules/',
			'**/.svelte-kit/',
			'**/.turbo/',
			'**/graphql/types.ts',
			'**/.vercel',
			'**/$houdini',
		],
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: tsEslint.parser,
			},
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es2017,
			},
		},
	},
	{
		files: ['**/*.ts'],
		languageOptions: {
			parser: tsEslint.parser,
			ecmaVersion: 2020,
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es2017,
			},
		},
		plugins: {
			'@typescript-eslint': tsEslint.plugin,
		},
	},
	{
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ varsIgnorePattern: '^\\$\\$(Props|Events|Slots)$' },
			],
		},
	},
];
