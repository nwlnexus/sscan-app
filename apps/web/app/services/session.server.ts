// prettier-ignore
import { type AppLoadContext, createCookieSessionStorage, redirect } from '@remix-run/cloudflare';

import { getAuthenticator } from './auth.server';

type SessionConfig = {
	secrets: string[];
	nodeEnv: string;
};

const appSessionStorage = ({ secrets, nodeEnv }: SessionConfig) => {
	const sessionStorage = createCookieSessionStorage({
		cookie: {
			name: 'sscan-session',
			sameSite: 'lax',
			path: '/',
			httpOnly: true,
			secrets,
			secure: nodeEnv === 'production',
		},
	});

	const { getSession, commitSession, destroySession } = sessionStorage;

	return { getSession, commitSession, destroySession };
};

const getUserSession = async ({
	context,
	request,
}: {
	context: AppLoadContext;
	request: Request;
}) => {
	const sessionConfig = {
		nodeEnv: context.cloudflare.env.NODE_ENV,
		secrets: [context.cloudflare.env.SESSION_SECRET],
	} satisfies SessionConfig;
	const sessionStorage = appSessionStorage(sessionConfig);
	const authenticator = await getAuthenticator(context, sessionStorage);
	const user = await authenticator.isAuthenticated(request);

	if (!user) {
		const url = new URL(request.url);
		const pathname = url.pathname;
		if (['/login'].includes(pathname)) {
			return {
				user: null,
				authenticator,
			};
		} else {
			throw redirect(`/login?redirectTo=${encodeURIComponent(pathname)}`);
		}
	} else {
		return {
			user,
			authenticator,
		};
	}
};

export { appSessionStorage, getUserSession, type SessionConfig };
