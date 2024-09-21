import { invariantResponse } from '@epic-web/invariant'
import { type LoaderFunctionArgs } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { profile as profileSchema, record, recordSelectSchema, type Record } from '@sscan/db/schema'
import { type ColumnDef } from '@tanstack/react-table'
import { eq } from 'drizzle-orm'
import { type icons } from 'lucide-react'
import { type PropsWithChildren } from 'react'
import { DataTable } from '@/components/data-table'
import Icon from '@/components/icon'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { appAuthGuard } from '@/services/auth.server'
import { getDB } from '@/services/db.server'
import { type RouteHandle } from '@/types'

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

  const recColumns: ColumnDef<Record>[] = []

  return (
    <>
      <section className="grid flex-1 items-start gap-4 p-4 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="artists">Artists</TabsTrigger>
            <TabsTrigger value="counts">Counts</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <AllTabContent columns={recColumns} data={recs} />
          </TabsContent>
          <TabsContent value="artists">
            <ArtistsTabContent />
          </TabsContent>
          <TabsContent value="counts">
            <CountsTabContent />
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

const AllTabContent = <T,>({ columns, data }: { columns: ColumnDef<T>[]; data: T[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  )
}

const ArtistsTabContent = () => {
  return <div>Artists</div>
}

const CountsTabContent = () => {
  return <div>Counts</div>
}
