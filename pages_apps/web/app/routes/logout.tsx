import { type LoaderFunctionArgs } from '@remix-run/cloudflare'
import { getAuthenticator } from '@/services/auth.server'

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const authenticator = await getAuthenticator({ context })
  return await authenticator.logout(request, { redirectTo: '/' })
}
