import { type ActionFunctionArgs, redirect } from '@remix-run/cloudflare'
import { getAuthenticator, type AuthStrategy } from '@/services/auth.server'

export const loader = async () => redirect('/login')

export const action = async ({ context, request, params }: ActionFunctionArgs) => {
  if (!params.provider) return redirect('/login')

  const provider = params.provider as AuthStrategy

  const authenticator = await getAuthenticator({ context })
  return await authenticator.authenticate(provider, request, {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    throwOnError: true,
    context,
  })
}
