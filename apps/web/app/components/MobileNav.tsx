import { Link as RemixLink } from '@remix-run/react'
import { Button } from '@sscan/shared/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@sscan/shared/ui/sheet'
import { Home, LineChart, Package, Package2, PanelLeft, ShoppingCart, Users2 } from 'lucide-react'

export const description = 'Mobile navigation'

export const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild={true}>
        <Button size="icon" variant="outline" className="items-center justify-center sm:hidden">
          <PanelLeft className="ml-2.5 size-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <RemixLink
            to="#"
            className="group flex size-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Package2 className="size-5 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </RemixLink>
          <RemixLink
            to="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Home className="size-5" />
            Dashboard
          </RemixLink>
          <RemixLink
            to="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <ShoppingCart className="size-5" />
            Orders
          </RemixLink>
          <RemixLink to="#" className="flex items-center gap-4 px-2.5 text-foreground">
            <Package className="size-5" />
            Products
          </RemixLink>
          <RemixLink
            to="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Users2 className="size-5" />
            Customers
          </RemixLink>
          <RemixLink
            to="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <LineChart className="size-5" />
            Settings
          </RemixLink>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
