import { redirect, type AppLoadContext } from '@remix-run/cloudflare'
import { Authenticator } from 'remix-auth'
import { auth0Strategy } from './auth_strategies/auth0.strategy'
import { formStrategy } from './auth_strategies/form.strategy'
import { googleStrategy } from './auth_strategies/google.strategy'
import { AuthStrategies } from '@/services/auth_strategies'
import { sessionStorage } from '@/services/session'
import { type AuthProfile } from '@/types'

/**
 * The authentication strategies.
 * @enum {string}
 */
export type AuthStrategy = (typeof AuthStrategies)[keyof typeof AuthStrategies]

export const getAuthenticator = async ({
  context,
}: {
  context: AppLoadContext
}): Promise<Authenticator<AuthProfile>> => {
  // Create an instance of the authenticator, pass a generic with what
  // strategies will return and will store in the session
  const authenticator = new Authenticator<AuthProfile>(sessionStorage)

  // Register your strategies below
  authenticator.use(formStrategy, AuthStrategies.FORM)
  authenticator.use(googleStrategy(context), AuthStrategies.GOOGLE)
  authenticator.use(auth0Strategy(context), AuthStrategies.AUTH0)
  return authenticator
}

export const appAuthGuard = async ({
  context,
  request,
}: {
  context: AppLoadContext
  request: Request
}) => {
  const url = new URL(request.url)
  const authenticator = await getAuthenticator({ context })
  const redirectTo =
    url.searchParams.get('redirectTo') ||
    btoa(url.pathname).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

  const profile = await authenticator.isAuthenticated(request)

  if (!profile && !request.url.includes('/login')) {
    throw redirect(`/login?redirectTo=${redirectTo}`)
  }

  if (profile && request.url.includes('/login')) {
    throw redirect(`/dashboard`)
  }

  return profile
}
