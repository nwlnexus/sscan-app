import sharedConfig from '@sscan/shared/tailwind.config'
import { type Config } from 'tailwindcss'

export default {
  ...sharedConfig,
  content: [
    './app/**/{**,.client,.server}/*.{js,jsx,ts,tsx}',
    '../../packages/shared/**/*.{js,jsx,ts,tsx}',
  ],
} satisfies Config
