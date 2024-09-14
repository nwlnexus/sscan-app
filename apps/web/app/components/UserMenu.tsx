import { Link as RemixLink, useLoaderData } from '@remix-run/react'
import { Avatar, AvatarImage, AvatarFallback } from '@sscan/shared/ui/avatar'
import { Button } from '@sscan/shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@sscan/shared/ui/dropdown-menu'
import { CircleHelp, LogOut, Settings, UserIcon } from 'lucide-react'
import { type AppLoaderData } from '../routes/_app'

const UserMenuItems = [
  {
    icon: Settings,
    label: 'Preferences',
    href: '/settings',
  },
  {
    icon: CircleHelp,
    label: 'Support',
    href: '/support',
  },
]

export const UserMenu = () => {
  const { profile } = useLoaderData<AppLoaderData>()
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild={true}>
          <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
            <Avatar>
              <AvatarImage src={profile.image} />
              <AvatarFallback>
                <UserIcon />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="z-50 w-56 min-w-[8rem] space-y-2 overflow-hidden rounded border bg-popover p-2 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
        >
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator className="-mx-1 bg-muted" />
          <DropdownMenuItem className="data-[disabled]:opacity-50flex relative flex cursor-default select-none flex-col items-start items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none">
            <span>{profile.displayName}</span>
            <span className="text-muted-foreground">{profile.email}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="-mx-1 bg-muted" />
          <DropdownMenuGroup>
            {UserMenuItems.map((item) => (
              <DropdownMenuItem
                key={item.label}
                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              >
                <RemixLink to={item.href} className="flex flex-row items-center">
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.label}</span>
                </RemixLink>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="-mx-1 bg-muted" />
          <DropdownMenuItem className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
            <RemixLink to="/logout" className="flex flex-row items-center">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </RemixLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
