import { createCookie } from '@remix-run/cloudflare'

/**
 * The preferences cookie.
 * @returns {ReturnType<typeof createCookie>} The preferences cookie.
 */
export const prefs = (): ReturnType<typeof createCookie> =>
  createCookie('sscan_prefs', {
    path: '/',
    sameSite: 'lax',
    httpOnly: true,
    expires: new Date(Date.now() + 60_000),
    maxAge: 60,
    secrets: [import.meta.env.VITE_SESSION_SECRET],
    secure: import.meta.env.NODE_ENV === 'production',
  })

/**
 * Create the authentication redirect cookie.
 * @returns {ReturnType<typeof createCookie>} The authentication redirect cookie.
 */
export const authRedirectCookie = (): ReturnType<typeof createCookie> => {
  return createCookie('sscan_auth_rto', {
    path: '/',
    sameSite: 'lax',
    httpOnly: true,
    expires: new Date(Date.now() + 60_000),
    maxAge: 60,
    secrets: [import.meta.env.VITE_SESSION_SECRET],
    secure: import.meta.env.NODE_ENV === 'production',
  })
}
