import { type LoaderFunctionArgs } from '@remix-run/cloudflare'
import { appAuthGuard } from '@/services/auth.server'
import { type RouteHandle } from '@/types'

export const handle: RouteHandle = {
  title: 'Dashboard',
  breadcrumb: () => <span>Dashboard</span>,
}

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  await appAuthGuard({ context, request })
  return null
}

export default function DashboardView() {
  return <div>Hello World</div>
}
