import { Link as RemixLink, useLocation, useMatches } from '@remix-run/react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@sscan/shared/ui/breadcrumb'

type RouteMatch = {
  id: string
  pathname: string
  params: Params<string>
  data: unknown
  handle: RouteHandle
}

type RouteHandle = {
  breadcrumb: (match: RouteMatch) => React.ReactNode
}

export const BreadcrumbDisplay = () => {
  const { pathname } = useLocation()
  const matches = useMatches()
  const filteredMatches = (matches as RouteMatch[]).filter(
    (match) => match.handle && match.handle.breadcrumb,
  )
  const matchesLength = filteredMatches.length

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {filteredMatches.map((match, index) => (
          <>
            {match.pathname !== pathname && (
              <BreadcrumbItem key={index}>
                <BreadcrumbLink asChild={true}>
                  <RemixLink to={match.pathname}>{match.handle.breadcrumb(match)}</RemixLink>
                </BreadcrumbLink>
              </BreadcrumbItem>
            )}
            {match.pathname === pathname && (
              <BreadcrumbPage>{match.handle.breadcrumb(match)}</BreadcrumbPage>
            )}
            {index < matchesLength - 1 && <BreadcrumbSeparator />}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
