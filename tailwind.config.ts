import type { Config } from 'tailwindcss';

import { join } from 'path';
import twPlugin from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';

export default {
	darkMode: 'media',
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
			themes: {
				preset: [
					{ name: 'skeleton', enhancements: true },
					{ name: 'crimson', enhancements: true }
				]
			}
		})
	]
} satisfies Config;
