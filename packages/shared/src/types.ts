export type MenuItem = {
  icon: React.ElementType
  label: string
  href: string
}

export type NavbarProps<T> = {
  type?: 'desktop' | 'web'
  items: MenuItem[]
  profile?: T extends Profile ? T : never
  icon?: React.ElementType
  title?: string
}

export type Profile = {
  image: string
  displayName: string
  email: string
  isAdmin: boolean
}
