module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:svelte/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	plugins: ['@typescript-eslint'],
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			// Parse the `<script>` in `.svelte` as TypeScript by adding the following configuration.
			parserOptions: {
				parser: '@typescript-eslint/parser',
			},
		},
	],
	parserOptions: {
		project: './tsconfig.json',
		extraFileExtensions: ['.svelte'],
		sourceType: 'module',
		ecmaVersion: 2020,
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	ignorePatterns: [
		'!.github',
		'.vscode/',
		'**/node_modules/',
		'**/.svelte-kit/',
		'**/.turbo/',
	],
};
