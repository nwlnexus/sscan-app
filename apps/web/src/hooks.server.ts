import { type Handle } from '@sveltejs/kit';
import { dev } from '$app/environment';

let platform: App.Platform;

if (dev) {
	const { getPlatformProxy } = await import('wrangler');
	platform = await getPlatformProxy();
	console.log('Platform initialized for local development', platform);
}

export const handle = (async ({ event, resolve }) => {
	if (dev && platform) {
		event.platform = {
			...event.platform,
			...platform,
		};
	}

	return resolve(event);
}) satisfies Handle;
