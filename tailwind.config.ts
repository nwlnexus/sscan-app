import type { Config } from 'tailwindcss';

import { join } from 'path';
import twPlugin from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/skeleton/plugin';
import * as themes from '@skeletonlabs/skeleton/themes';

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],

	theme: {
		extend: {}
	},

	plugins: [
		twPlugin,
		skeleton({
			themes: [themes.cerberus]
		})
	]
} satisfies Config;
