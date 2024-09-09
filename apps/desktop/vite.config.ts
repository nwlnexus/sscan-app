import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
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
		remix({
			ssr: false,
			future: {
				v3_fetcherPersist: true,
				v3_relativeSplatPath: true,
				v3_throwAbortReason: true,
				unstable_singleFetch: true,
			},
		}),
		tsconfigPaths(),
	],
	clearScreen: false,
	server: {
		port: 1420,
		strictPort: true,
		watch: {
			// 3. tell vite to ignore watching `src-tauri`
			ignored: ['**/src-tauri/**'],
		},
	},
});
