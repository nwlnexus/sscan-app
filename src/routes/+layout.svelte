<script lang="ts">
	import '../app.postcss';
	import Navbar from '$lib/components/ui/Navbar.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import PanelLeft from 'lucide-svelte/icons/panel-left';
	import Home from 'lucide-svelte/icons/house';
	import ShoppingCart from 'lucide-svelte/icons/shopping-cart';
	import Package from 'lucide-svelte/icons/package';
	import UsersRound from 'lucide-svelte/icons/users-round';
	import LineChart from 'lucide-svelte/icons/chart-spline';
	import Search from 'lucide-svelte/icons/search';
	import Package2 from 'lucide-svelte/icons/package-2';

	import { ModeWatcher } from 'mode-watcher';
</script>

<ModeWatcher />

<div class="bg-muted/40 flex min-h-screen w-full flex-col">
	<aside class="bg-background fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r sm:flex">
		<Navbar />
	</aside>
	<div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
		<header
			class="bg-background sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
		>
			<Sheet.Root>
				<Sheet.Trigger asChild let:builder>
					<Button builders={[builder]} size="icon" variant="outline" class="sm:hidden">
						<PanelLeft class="h-5 w-5" />
						<span class="sr-only">Toggle Menu</span>
					</Button>
				</Sheet.Trigger>
				<Sheet.Content side="left" class="sm:max-w-xs">
					<nav class="grid gap-6 text-lg font-medium">
						<a
							href="##"
							class="bg-primary text-primary-foreground group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:text-base"
						>
							<Package2 class="h-5 w-5 transition-all group-hover:scale-110" />
							<span class="sr-only">Acme Inc</span>
						</a>
						<a
							href="##"
							class="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
						>
							<Home class="h-5 w-5" />
							Dashboard
						</a>
						<a href="##" class="text-foreground flex items-center gap-4 px-2.5">
							<ShoppingCart class="h-5 w-5" />
							Orders
						</a>
						<a
							href="##"
							class="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
						>
							<Package class="h-5 w-5" />
							Products
						</a>
						<a
							href="##"
							class="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
						>
							<UsersRound class="h-5 w-5" />
							Customers
						</a>
						<a
							href="##"
							class="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
						>
							<LineChart class="h-5 w-5" />
							Settings
						</a>
					</nav>
				</Sheet.Content>
			</Sheet.Root>
			<Breadcrumb.Root class="hidden md:flex">
				<Breadcrumb.List>
					<Breadcrumb.Item>
						<Breadcrumb.Link href="##">Dashboard</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator />
					<Breadcrumb.Item>
						<Breadcrumb.Link href="##">Orders</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator />
					<Breadcrumb.Item>
						<Breadcrumb.Page>Recent Orders</Breadcrumb.Page>
					</Breadcrumb.Item>
				</Breadcrumb.List>
			</Breadcrumb.Root>
			<div class="relative ml-auto flex-1 md:grow-0">
				<Search class="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
				<Input
					type="search"
					placeholder="Search..."
					class="bg-background w-full rounded-lg pl-8 md:w-[200px] lg:w-[320px]"
				/>
			</div>
		</header>
		<main
			class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3"
		>
			<slot />
		</main>
	</div>
</div>
