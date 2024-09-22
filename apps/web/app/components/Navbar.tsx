import { Link as RemixLink, useRouteLoaderData } from '@remix-run/react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../../packages/shared/src/ui/tooltip'
import { ShieldEllipsis } from 'lucide-react'
import { type RootLoaderData } from '../root'
import S from '@/assets/S.svg?react'
import { SidebarMenuItems } from '@/constants'

export const Navbar = () => {
  const { profile } = useRouteLoaderData<RootLoaderData>('root')
  return (
    <TooltipProvider>
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <RemixLink
          to="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <S className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </RemixLink>
        {SidebarMenuItems.map((item, idx) => (
          <Tooltip key={idx}>
            <TooltipTrigger asChild>
              <RemixLink
                to={item.href}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.label}</span>
              </RemixLink>
            </TooltipTrigger>
            <TooltipContent side="right">{item.label}</TooltipContent>
          </Tooltip>
        ))}
      </nav>
      {profile.isAdmin && (
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <RemixLink
                to="/admin"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <ShieldEllipsis className="h-5 w-5" color="orange" />
                <span className="sr-only">Admin settings</span>
              </RemixLink>
            </TooltipTrigger>
            <TooltipContent side="right">Admin settings</TooltipContent>
          </Tooltip>
        </nav>
      )}
    </TooltipProvider>
  )
}
