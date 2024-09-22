import { Link as RemixLink } from '@remix-run/react'
import { PanelLeft } from 'lucide-react'
import S from '@/assets/S.svg?react'
import { type NavbarProps } from '@/types'
import { Button } from '@/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/ui/sheet'

export const description = 'Mobile navigation'

export function MobileNav<T>({ items, title }: Omit<NavbarProps<T>, 'type' | 'profile'>) {
  return (
    <Sheet>
      <SheetTrigger asChild={true}>
        <Button size="icon" variant="outline" className="items-center justify-center sm:hidden">
          <PanelLeft className="size-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <RemixLink
            to="#"
            className="group flex size-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <S className="size-5 transition-all group-hover:scale-110" />
            {title && <span className="sr-only">{title}</span>}
          </RemixLink>
          {items.map((item, idx) => (
            <RemixLink
              key={idx}
              to={item.href}
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <item.icon className="size-5" />
              {item.label}
            </RemixLink>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
