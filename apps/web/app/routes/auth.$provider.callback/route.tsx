import { redirect, type LoaderFunctionArgs } from '@remix-run/cloudflare'
import { getAuthenticator, type AuthStrategy } from '@/services/auth.server'

export const loader = async ({ context, request, params }: LoaderFunctionArgs) => {
  // If the provider is not specified, redirect to the login page
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
