import { type AppLoadContext } from '@remix-run/cloudflare'
import { type Profile } from '@sscan/db/schema'
import { Authenticator } from 'remix-auth'
import { auth0Strategy } from './auth_strategies/auth0.strategy'
import { formStrategy } from './auth_strategies/form.strategy'
import { googleStrategy } from './auth_strategies/google.strategy'
import { AuthStrategies } from '@/services/auth_strategies'
import { sessionStorage } from '@/services/session.server'

export type AuthStrategy = (typeof AuthStrategies)[keyof typeof AuthStrategies]

export const getAuthenticator = async ({ context }: { context: AppLoadContext }) => {
  // Create an instance of the authenticator, pass a generic with what
  // strategies will return and will store in the session
  const authenticator = new Authenticator<Profile | null>(sessionStorage)

  // Register your strategies below
  authenticator.use(formStrategy, AuthStrategies.FORM)
  authenticator.use(googleStrategy(context), AuthStrategies.GOOGLE)
  authenticator.use(auth0Strategy(context), AuthStrategies.AUTH0)
  return authenticator
}
