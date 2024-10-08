import { Link as RemixLink } from '@remix-run/react'
import S from '@shared/assets/S.svg?react'
import { type NavbarProps } from '@shared/types'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@shared/ui/tooltip'
import { ShieldEllipsis } from 'lucide-react'

export function Navbar<T>({ items, profile, title, type = 'web' }: NavbarProps<T>) {
  const isDesktop = type === 'desktop'
  const isWeb = type === 'web'

  if (isDesktop) {
    return <></>
  } else if (isWeb) {
    return (
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <RemixLink
            to="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <S className="size-5 transition-all group-hover:scale-110" />
            {title && <span className="sr-only">{title}</span>}
          </RemixLink>
          {items.map((item, idx) => (
            <Tooltip key={idx}>
              <TooltipTrigger asChild>
                <RemixLink
                  to={item.href}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  {item.icon && <item.icon className="h-5 w-5" />}
                  <span className="sr-only">{item.label}</span>
                </RemixLink>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
        {profile && profile.isAdmin && (
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
  } else {
    throw new Error('Invalid type')
  }
}
