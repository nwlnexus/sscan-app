import { createCookie } from '@remix-run/cloudflare'

export const prefs = createCookie('sscan_prefs')

export const authRedirectCookie = () => {
  return createCookie('sscan_auth_rto', {
    path: '/',
    sameSite: 'lax',
    httpOnly: true,
    expires: new Date(Date.now() + 60_000),
    maxAge: 60,
    secrets: [import.meta.env.SESSION_SECRET],
    secure: import.meta.env.NODE_ENV === 'production',
  })
}
