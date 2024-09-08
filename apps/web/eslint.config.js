import eslintConfig from '@repo/config/eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
	...eslintConfig,
	{
		ignores: ['build/', '.svelte-kit/', 'dist/', 'playwright.config.ts', 'tailwind.config.ts'],
	},
];
