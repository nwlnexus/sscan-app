import { type Config } from 'tailwindcss';

import baseConfig from '@repo/tailwind/web';

export default {
	content: ['./src/**/*.tsx'],
	presets: [baseConfig],
} satisfies Config;
