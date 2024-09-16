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
import { LogOut, UserIcon } from 'lucide-react'
import { UserMenuItems } from '../constants'
import { type AppLoaderData } from '../routes/_app'

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
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex flex-col items-start">
            <span>{profile.displayName}</span>
            <span className="text-muted-foreground">{profile.email}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {UserMenuItems.map((item) => (
              <DropdownMenuItem key={item.label} asChild={true}>
                <RemixLink to={item.href} className="flex flex-row items-center">
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.label}</span>
                </RemixLink>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
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
