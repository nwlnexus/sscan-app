import { Link as RemixLink, useLocation, useMatches } from '@remix-run/react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@sscan/shared/ui/breadcrumb'
import { House } from 'lucide-react'
import { type RouteMatch } from '../types'

export const HeaderDisplay = () => {
  const { pathname } = useLocation()
  const matches = useMatches()
  const filteredMatches = (matches as RouteMatch[]).filter(
    (match) => match.handle && match.handle.title,
  )
  const matchesLength = filteredMatches.length

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild={true}>
            <RemixLink to={'/dashboard'}>
              <House className="size-5" />
            </RemixLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {filteredMatches.map((match, index) => (
          <div key={index}>
            {match.pathname !== pathname && (
              <BreadcrumbItem>
                <BreadcrumbLink asChild={true}>
                  <RemixLink to={match.pathname}>{match.handle.title}</RemixLink>
                </BreadcrumbLink>
              </BreadcrumbItem>
            )}
            {match.pathname === pathname && <BreadcrumbPage>{match.handle.title}</BreadcrumbPage>}
            {index < matchesLength - 1 && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
