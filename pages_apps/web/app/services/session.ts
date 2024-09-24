import { createCookieSessionStorage } from '@remix-run/cloudflare'
import { type Profile } from '@sscan/db/schema'

export const sessionStorage: ReturnType<typeof createCookieSessionStorage<Profile>> =
  createCookieSessionStorage<Profile>({
    cookie: {
      name: 'sscan_session', // use any name you want here
      sameSite: 'lax', // this helps with CSRF
      maxAge: 60 * 60, // 1 hour
      path: '/', // remember to add this so the cookie will work in all routes
      httpOnly: true, // for security reasons, make this cookie http only
      secrets: [import.meta.env.VITE_SESSION_SECRET], // replace this with an actual secret
      secure: import.meta.env.NODE_ENV === 'production', // enable this in prod only
    },
  })

// you can also export the methods individually for your own usage
export const { getSession, commitSession, destroySession } = sessionStorage
