import { type PlatformProxy } from 'wrangler';

type Cloudflare = Omit<PlatformProxy<{ [key: string]: unknown } & Env>, 'dispose'>;

declare module '@remix-run/cloudflare' {
	interface AppLoadContext {
		cloudflare: Cloudflare;
	}
}
