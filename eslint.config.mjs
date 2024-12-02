import svelteParser from 'svelte-eslint-parser';
import tsEslint from 'typescript-eslint';
import globals from 'globals';
import eslintJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import playwright from 'eslint-plugin-playwright';

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
			'**/graphql/types.ts',
			'**/.vercel',
			'**/$houdini',
		],
	},
	{
		...playwright.configs['flat/recommended'],
		files: ['tests/**'],
		rules: {
			...playwright.configs['flat/recommended'].rules,
			'playwright/no-conditional-in-test': 'off',
		},
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
				{
					varsIgnorePattern: '^\\$\\$(Props|Events|Slots)$',
				},
			],
			'@typescript-eslint/no-unused-expressions': [
				'warn',
				{
					allowShortCircuit: true,
				},
			],
		},
	},
];
