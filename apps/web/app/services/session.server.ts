import { createCookieSessionStorage } from '@remix-run/cloudflare'

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'sscan_session',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [import.meta.env.VITE_SESSION_SECRET],
    secure: import.meta.env.NODE_ENV === 'production',
  },
})

export const { getSession, commitSession, destroySession } = sessionStorage
