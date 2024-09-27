import { invariantResponse } from '@epic-web/invariant'
import { type LoaderFunctionArgs } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { record, type Record } from '@sscan/db/schema'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@sscan/shared/ui/tabs'
import { eq } from 'drizzle-orm'
import { recColumns } from './columns'
import { AllTabContent } from './tab-content-all'
import { ArtistsTabContent } from './tab-content-artists'
import { CountsTabContent } from './tab-content-counts'
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
  const recs = profile.isAdmin
    ? await db.query.record.findMany()
    : await db.query.record.findMany({
        where: eq(record.accountId, profile.id),
      })

  return { recs }
}

export default function DashboardView() {
  const { recs } = useLoaderData<typeof loader>()

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
            <AllTabContent<Record> columns={recColumns} data={recs} />
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
