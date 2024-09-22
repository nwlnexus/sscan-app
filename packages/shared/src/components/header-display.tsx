import { Link as RemixLink } from '@remix-run/react'
import { House } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/ui/breadcrumb'

type Params<T extends string = never> = { [P in T]: string | string[] }

type RouteMatch = {
  id: string
  pathname: string
  params: Params<string>
  data: unknown
  handle: {
    title?: string
    breadcrumb?: (match: RouteMatch) => React.ReactNode
  }
}

type HeaderDisplayProps = {
  pathname: string
  matches: RouteMatch[]
}

export const HeaderDisplay = ({ matches, pathname }: HeaderDisplayProps) => {
  const matchesLength = matches.length

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
        {matches.map((match, index) => (
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
