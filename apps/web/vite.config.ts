import {
	vitePlugin as remix,
	cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from '@remix-run/dev';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

declare module '@remix-run/server-runtime' {
	interface Future {
		unstable_singleFetch: true; // 👈 enable _types_ for single-fetch
	}
}

const isDev = process.env.NODE_ENV === 'development';
export default defineConfig({
	build: {
		cssMinify: !isDev,

		rollupOptions: {
			external: [/node:.*/, 'stream', 'crypto', 'fsevents'],
		},

		assetsInlineLimit: (source: string) => {
			if (source.endsWith('sprite.svg')) {
				return false;
			}
		},

		sourcemap: true,
	},
	plugins: [
		remixCloudflareDevProxy({ persist: { path: '../../.wrangler' } }),
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
});
