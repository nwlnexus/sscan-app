import { type ActionFunctionArgs, redirect } from '@remix-run/cloudflare'
import { getAuthenticator, type AuthStrategy } from '@/services/auth.server'

export const loader = async () => redirect('/login')

export const action = async ({ context, request, params }: ActionFunctionArgs) => {
  const url = new URL(request.url)
  const redirectTo =
    url.searchParams.get('redirectTo') ||
    btoa('/dashboard').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

  if (!params.provider) return redirect('/login')

  const provider = params.provider as AuthStrategy

  const authenticator = await getAuthenticator({ context })
  return await authenticator.authenticate(provider, request, {
    successRedirect: atob(redirectTo.replace(/-/g, '+').replace(/_/g, '/')),
    failureRedirect: '/login',
    throwOnError: true,
    context,
  })
}
