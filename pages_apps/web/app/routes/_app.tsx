import { type LoaderFunctionArgs } from '@remix-run/cloudflare'
import { Outlet, useRouteLoaderData } from '@remix-run/react'
import { type Profile } from '@sscan/db/schema'
import { ModeSwitcher } from '@sscan/shared/components/mode-switcher'
import { Navbar } from '@sscan/shared/components/navbar'
import { Search } from '@sscan/shared/components/search'
import { HeaderDisplay } from '@/components/header-display'
import { MobileNav } from '@/components/mobile-nav'
import { UserMenu } from '@/components/user-menu'
import { SidebarMenuItems } from '@/constants'
import { appAuthGuard } from '@/services/auth.server'

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const profile = await appAuthGuard({ context, request })
  return { profile }
}
export type AppLayoutLoaderData = typeof loader

export default function AppLayout() {
  const { profile } = useRouteLoaderData<AppLayoutLoaderData>('root')
  if (profile) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <Navbar<Profile> type="web" title="SScan" items={SidebarMenuItems} profile={profile} />
        </aside>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="h-18 sticky top-0 z-30 flex items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <MobileNav />
            <HeaderDisplay />
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search />
            </div>
            <ModeSwitcher />
            <UserMenu />
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Outlet />
          </main>
        </div>
      </div>
    )
  }
}
