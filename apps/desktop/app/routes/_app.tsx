import { Outlet, Link as RemixLink } from '@remix-run/react'
import { ModeSwitcher } from '@sscan/shared/components/mode-switcher'
import { Navbar } from '@sscan/shared/components/navbar'
import { Search } from '@sscan/shared/components/search'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@sscan/shared/ui/breadcrumb'
import { SidebarMenuItems } from '../constants'

export default function AppLayout() {
  // const { pathname } = useLocation()
  // const matches = useMatches()
  // const filteredMatches = (matches as RouteMatch[]).filter(
  //   (match) => match.handle && match.handle.title,
  // )
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <Navbar type="desktop" title="SScan" items={SidebarMenuItems} profile={} />
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="h-18 sticky top-0 z-30 flex items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <RemixLink to="#">Dashboard</RemixLink>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <RemixLink to="#">Products</RemixLink>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>All Products</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search />
          </div>
          <ModeSwitcher />
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
