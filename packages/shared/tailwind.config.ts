import baseConfig from '@repo/tailwind/web'
import { type Config } from 'tailwindcss'

export default {
  content: [...baseConfig.content, './src/**/*.tsx'],
  presets: [baseConfig],
} satisfies Config
