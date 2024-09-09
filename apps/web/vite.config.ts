import {
	vitePlugin as remix,
	cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from '@remix-run/dev';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

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
			},
		}),
		svgr(),
		tsconfigPaths(),
	],
});
