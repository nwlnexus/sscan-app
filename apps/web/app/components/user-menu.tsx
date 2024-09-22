import { Link as RemixLink, useRouteLoaderData } from '@remix-run/react'
import { Avatar, AvatarImage, AvatarFallback } from '../../../../packages/shared/src/ui/avatar'
import { Button } from '../../../../packages/shared/src/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../../packages/shared/src/ui/dropdown-menu'
import { LogOut, UserIcon } from 'lucide-react'
import { type RootLoaderData } from '../root'
import { UserMenuItems } from '@/constants'

export const UserMenu = () => {
  const { profile } = useRouteLoaderData<RootLoaderData>('root')
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
        <DropdownMenuContent align="end" className="bg-background">
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
