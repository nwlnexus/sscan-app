import { type LoaderFunctionArgs } from '@remix-run/cloudflare'
import { getAuthenticator } from '@services/auth.server'

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const authenticator = await getAuthenticator({ context })
  return authenticator.authenticate('auth0', request, {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    throwOnError: true,
  })
}
