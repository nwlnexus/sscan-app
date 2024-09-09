import { type MetaFunction } from '@remix-run/cloudflare';
import { Outlet, Link as RemixLink } from '@remix-run/react';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@sscan/ui/breadcrumb';
import { Button } from '@sscan/ui/button';
import { Input } from '@sscan/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@sscan/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@sscan/ui/tooltip';
import {
	Home,
	LineChart,
	Package,
	Package2,
	PanelLeft,
	Search,
	ShoppingCart,
	Users2,
} from 'lucide-react';

export const meta: MetaFunction = () => {
	return [{ title: 'SSCAN | App' }];
};

export const description =
	'An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions.';

export default function AppLayout() {
	return (
		<TooltipProvider>
			<div className="flex min-h-screen w-full flex-col bg-muted/40">
				<aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
					<nav className="flex flex-col items-center gap-4 px-2 py-4">
						<RemixLink
							to="#"
							className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
						>
							<Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
							<span className="sr-only">Acme Inc</span>
						</RemixLink>
						<Tooltip>
							<TooltipTrigger asChild={true}>
								<RemixLink
									to="#"
									className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
								>
									<Home className="h-5 w-5" />
									<span className="sr-only">Dashboard</span>
								</RemixLink>
							</TooltipTrigger>
							<TooltipContent side="right">Dashboard</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild={true}>
								<RemixLink
									to="#"
									className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8"
								>
									<ShoppingCart className="h-5 w-5" />
									<span className="sr-only">Orders</span>
								</RemixLink>
							</TooltipTrigger>
							<TooltipContent side="right">Orders</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild={true}>
								<RemixLink
									to="#"
									className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
								>
									<Package className="h-5 w-5" />
									<span className="sr-only">Products</span>
								</RemixLink>
							</TooltipTrigger>
							<TooltipContent side="right">Products</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild={true}>
								<RemixLink
									to="#"
									className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
								>
									<Users2 className="h-5 w-5" />
									<span className="sr-only">Customers</span>
								</RemixLink>
							</TooltipTrigger>
							<TooltipContent side="right">Customers</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild={true}>
								<RemixLink
									to="#"
									className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
								>
									<LineChart className="h-5 w-5" />
									<span className="sr-only">Analytics</span>
								</RemixLink>
							</TooltipTrigger>
							<TooltipContent side="right">Analytics</TooltipContent>
						</Tooltip>
					</nav>
				</aside>
				<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
					<header className="sticky top-0 z-30 flex h-18 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
						<Sheet>
							<SheetTrigger asChild={true}>
								<Button size="icon" variant="outline" className="sm:hidden">
									<PanelLeft className="size-5" />
									<span className="sr-only">Toggle Menu</span>
								</Button>
							</SheetTrigger>
							<SheetContent side="left" className="sm:max-w-xs">
								<nav className="grid gap-6 text-lg font-medium">
									<RemixLink
										to="#"
										className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
									>
										<Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
										<span className="sr-only">Acme Inc</span>
									</RemixLink>
									<RemixLink
										to="#"
										className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
									>
										<Home className="h-5 w-5" />
										Dashboard
									</RemixLink>
									<RemixLink
										to="#"
										className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
									>
										<ShoppingCart className="h-5 w-5" />
										Orders
									</RemixLink>
									<RemixLink to="#" className="flex items-center gap-4 px-2.5 text-foreground">
										<Package className="h-5 w-5" />
										Products
									</RemixLink>
									<RemixLink
										to="#"
										className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
									>
										<Users2 className="h-5 w-5" />
										Customers
									</RemixLink>
									<RemixLink
										to="#"
										className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
									>
										<LineChart className="h-5 w-5" />
										Settings
									</RemixLink>
								</nav>
							</SheetContent>
						</Sheet>
						<Breadcrumb className="hidden md:flex">
							<BreadcrumbList>
								<BreadcrumbItem>
									<BreadcrumbLink asChild>
										<RemixLink to="#">Dashboard</RemixLink>
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbLink asChild>
										<RemixLink to="#">Products</RemixLink>
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbPage>All Products</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
						<div className="relative ml-auto flex-1 md:grow-0">
							<Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Search..."
								className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
							/>
						</div>
					</header>
					<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
						<Outlet />
					</main>
				</div>
			</div>
		</TooltipProvider>
	);
}
