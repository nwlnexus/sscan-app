import { type LoaderFunctionArgs } from '@remix-run/cloudflare'
import { type icons } from 'lucide-react'
import { type PropsWithChildren } from 'react'
import Icon from '@/components/Icon'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <DashCard title="Total Users" icon="User">
          <div className="text-2xl font-bold">100</div>
        </DashCard>
        <DashCard title="Total Users">
          <div className="text-2xl font-bold">100</div>
        </DashCard>
        <DashCard title="Total Users">
          <div className="text-2xl font-bold">100</div>
        </DashCard>
        <DashCard title="Total Users">
          <div className="text-2xl font-bold">100</div>
        </DashCard>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
        <Card className="bg-background">
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100</div>
          </CardContent>
        </Card>
        <Card className="bg-background">
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100</div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

type DashCardProps = {
  title: string
  icon?: keyof typeof icons
}

const DashCard = ({ title, icon, children }: PropsWithChildren<DashCardProps>) => {
  return (
    <Card className="bg-background">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <Icon name={icon} className="size-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
