import baseConfig from '@repo/config/eslint';

export default [
	{
		ignores: ['dist/**/*'],
		...baseConfig,
	},
];
