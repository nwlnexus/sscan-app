import { Settings, CircleHelp, Home, ShoppingCart } from 'lucide-react'
import { type MenuItem } from './types'

export const UserMenuItems = [
  {
    icon: Settings,
    label: 'Preferences',
    href: '/preferences',
  },
  {
    icon: CircleHelp,
    label: 'Support',
    href: '/support',
  },
] satisfies MenuItem[]

/**
 * Sidebar Menu Items
 */
export const SidebarMenuItems = [
  {
    icon: Home,
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    icon: ShoppingCart,
    label: 'Orders',
    href: '/orders',
  },
] satisfies MenuItem[]
