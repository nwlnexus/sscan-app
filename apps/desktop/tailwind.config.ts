import sharedConfig from '@sscan/shared/tailwind.config'
import { type Config } from 'tailwindcss'

export default {
  ...sharedConfig,
  content: [
    './app/**/{**,.client,.server}/*.{js,jsx,ts,tsx}',
    'node_modules/@sscan/shared/src/**/*.{js,jsx,ts,tsx}',
  ],
} satisfies Config
