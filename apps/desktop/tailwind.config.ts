import { type Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

import base from '@repo/tailwind/web';

export default {
  content: [...base.content, './app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
  presets: [base],
  safelist: ['dark'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        mono: [...fontFamily.mono],
      },
    },
  },
} satisfies Config;
