import { type Profile } from '@sscan/db/schema'

export type RouteMatch = {
  id: string
  pathname: string
  params: Params<string>
  data: unknown
  handle: RouteHandle
}

export type RouteHandle = {
  title?: string
  breadcrumb?: (match: RouteMatch) => React.ReactNode
}

export type MenuItem = {
  icon: React.ElementType
  label: string
  href: string
}

export type AuthProfile = Omit<Profile, 'passwordHash'> | null
