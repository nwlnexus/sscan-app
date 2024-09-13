import { type ActionFunctionArgs, redirect } from '@remix-run/cloudflare'
import { getAuthenticator } from '@services/auth.server'

export const loader = async () => {
  redirect('/')
}

export const action = async ({ context, request }: ActionFunctionArgs) => {
  const authenticator = await getAuthenticator({ context })
  return authenticator.authenticate('auth0', request)
}
