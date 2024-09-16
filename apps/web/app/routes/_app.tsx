import { type LoaderFunctionArgs, type MetaFunction } from '@remix-run/cloudflare'
import { Outlet } from '@remix-run/react'
import { HeaderDisplay } from '@/components/HeaderDisplay'
import { MobileNav } from '@/components/MobileNav'
import { Navbar } from '@/components/Navbar'
import { Search } from '@/components/Search'
import { UserMenu } from '@/components/UserMenu'
import { appAuthGuard } from '@/services/auth.server'

export const meta: MetaFunction = () => {
  return [{ title: 'SSCAN | App' }]
}

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const profile = await appAuthGuard({ context, request })
  return { profile }
}
export type AppLoaderData = typeof loader

export default function AppLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <Navbar />
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="h-18 sticky top-0 z-30 flex items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <MobileNav />
          <HeaderDisplay />
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search />
          </div>
          <UserMenu />
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
