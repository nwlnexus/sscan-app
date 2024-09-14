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
import { LogOut, Settings, UserIcon } from 'lucide-react'
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
        <DropdownMenuContent align="end" className="w-56 space-y-2 rounded border p-2">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex flex-col items-start">
            <span>{profile.displayName}</span>
            <span className="text-muted-foreground">{profile.email}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button asChild variant="ghost">
              <RemixLink to="/logout" className="flex flex-row items-center gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </RemixLink>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
