import { type LoaderFunctionArgs } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { account, profile as profileSchema, record } from '@sscan/db/schema'
import { count, countDistinct } from 'drizzle-orm'
import { type icons } from 'lucide-react'
import { type PropsWithChildren } from 'react'
import Icon from '@/components/Icon'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { appAuthGuard } from '@/services/auth.server'
import { getDB } from '@/services/db.server'
import { type RouteHandle } from '@/types'
import { cn } from '@/utils'

export const handle: RouteHandle = {
  title: 'Dashboard',
  breadcrumb: () => <span>Dashboard</span>,
}

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const profile = await appAuthGuard({ context, request })

  const db = getDB(context.cloudflare.env)
  const acctsCount = await db.select({ count: count(account.id) }).from(account)
  const profilesCount = await db.select({ count: count(profileSchema.id) }).from(profileSchema)
  const recordsCount = await db.select({ count: countDistinct(record.upc) }).from(record)

  return { acctsCount, profilesCount, recordsCount }
}

export default function DashboardView() {
  const { acctsCount, profilesCount, recordsCount } = useLoaderData<typeof loader>()

  return (
    <>
      <div className={cn('grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3')}>
        <DashCard title="Records processed" icon="Disc3">
          <div className="text-2xl font-bold">100</div>
        </DashCard>
        <DashCard title="Artists" icon="MicVocal">
          <div className="text-2xl font-bold">100</div>
        </DashCard>
        <DashCard title="Counts" icon="FileDigit">
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
