// prettier-ignore
import { createCookieSessionStorage } from '@remix-run/cloudflare';

type SessionConfig = {
  secrets: string[];
  nodeEnv: string;
};

const appSessionStorage = ({ secrets, nodeEnv }: SessionConfig) => {
  const sessionStorage = createCookieSessionStorage({
    cookie: {
      name: 'sscan_session',
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

export { appSessionStorage, type SessionConfig };
