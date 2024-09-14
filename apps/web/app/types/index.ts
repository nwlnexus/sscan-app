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
