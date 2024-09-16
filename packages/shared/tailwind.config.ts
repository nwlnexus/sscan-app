import baseConfig from '@repo/tailwind/web'
import { type Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.tsx', 'node_modules/@sscan/shared/**/*.tsx'],
  presets: [baseConfig],
} satisfies Config
