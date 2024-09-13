import { type ActionFunctionArgs } from '@remix-run/cloudflare'
import { authenticator } from '@/services/auth.server'

export const action = async ({ request }: ActionFunctionArgs) => {
  await authenticator.logout(request, { redirectTo: '/' })
}
