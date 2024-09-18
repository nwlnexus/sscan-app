import { invariantResponse } from '@epic-web/invariant'
import { type LoaderFunctionArgs } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { account, profile as profileSchema, record } from '@sscan/db/schema'
import { count, countDistinct, eq } from 'drizzle-orm'
import { type icons } from 'lucide-react'
import { type PropsWithChildren } from 'react'
import Icon from '@/components/Icon'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  invariantResponse(profile, 'Profile not found')

  const db = getDB(context.cloudflare.env)
  const recs = await db.query.record.findMany({
    where: eq(record.accountId, profile.id),
  })

  return { recs }
}

export default function DashboardView() {
  const { recs } = useLoaderData<typeof loader>()

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
      <section className="grid flex-1 items-start gap-4 p-4 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="artists">Artists</TabsTrigger>
            <TabsTrigger value="counts">Counts</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">100</div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </>
  )
}

type DashCardProps = {
  title: string
  icon?: keyof typeof icons
}

const DashCard = ({ title, icon, children }: PropsWithChildren<DashCardProps>) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <Icon name={icon} className="size-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
