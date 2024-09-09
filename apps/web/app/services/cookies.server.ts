import { createCookie } from '@remix-run/cloudflare';

export const prefs = createCookie('sscan_prefs');

export const authRedirectCookie = ({
	secrets,
	node_env,
}: {
	secrets: string[];
	node_env: string;
}) => {
	return createCookie('sscan_auth_rto', {
		path: '/',
		sameSite: 'lax',
		httpOnly: true,
		expires: new Date(Date.now() + 60_000),
		maxAge: 60,
		secrets,
		secure: node_env === 'production', // enable this in prod only
	});
};
