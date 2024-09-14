import { type RouteHandle } from '@/types'

export const handle: RouteHandle = {
  title: 'Dashboard',
  breadcrumb: () => <span>Dashboard</span>,
}

export default function DashboardView() {
  return <div>Hello World</div>
}
