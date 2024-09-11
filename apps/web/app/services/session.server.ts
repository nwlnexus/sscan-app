// prettier-ignore
import { type AppLoadContext, createCookieSessionStorage } from '@remix-run/cloudflare';

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

	if (user instanceof Error) {
		return {
			user: null,
			authenticator,
		};
	} else {
		return {
			user,
			authenticator,
		};
	}
};

export { appSessionStorage, getUserSession, type SessionConfig };
