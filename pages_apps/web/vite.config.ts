import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from '@remix-run/dev'
import { remixDevTools } from 'remix-development-tools'
import { type ConfigEnv, defineConfig, loadEnv } from 'vite'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

const isDev = process.env.NODE_ENV === 'development'

export default ({ mode }: ConfigEnv) => {
  // Here we add env vars from .env files to process.env.
  // Note the last arg is a blank string so that all env vars
  // are loaded, not just those starting with "VITE_"
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') }

  return defineConfig({
    build: {
      cssMinify: !isDev,

      rollupOptions: {
        external: [/node:.*/, 'stream', 'crypto', 'fsevents'],
      },

      assetsInlineLimit: (source: string) => {
        if (source.endsWith('sprite.svg')) {
          return false
        }
      },

      sourcemap: isDev,
    },
    clearScreen: false,
    plugins: [
      remixCloudflareDevProxy({ persist: { path: '../../.wrangler' } }),
      remixDevTools(),
      remix({
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
          unstable_singleFetch: true,
          unstable_optimizeDeps: true,
        },
      }),
      svgr(),
      tsconfigPaths(),
    ],
  })
}
