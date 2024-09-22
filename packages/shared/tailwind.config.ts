import base from '@repo/tailwind/web'
import { type Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  content: [...base.content, './src/**/*.{js,jsx,ts,tsx}'],
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
} satisfies Config
