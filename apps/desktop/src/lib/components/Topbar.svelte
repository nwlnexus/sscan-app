<script lang="ts">
	import { Breadcrumb, Button, Sheet, Input } from '@sscan/ui';
	import PanelLeft from 'lucide-svelte/icons/panel-left';
	import Home from 'lucide-svelte/icons/house';
	import ShoppingCart from 'lucide-svelte/icons/shopping-cart';
	import Package from 'lucide-svelte/icons/package';
	import UsersRound from 'lucide-svelte/icons/users-round';
	import LineChart from 'lucide-svelte/icons/chart-spline';
	import Search from 'lucide-svelte/icons/search';
	import Package2 from 'lucide-svelte/icons/package-2';
</script>

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
				class="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
			>
				<Package2 class="h-5 w-5 transition-all group-hover:scale-110" />
				<span class="sr-only">Acme Inc</span>
			</a>
			<a
				href="##"
				class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
			>
				<Home class="h-5 w-5" />
				Dashboard
			</a>
			<a href="##" class="flex items-center gap-4 px-2.5 text-foreground">
				<ShoppingCart class="h-5 w-5" />
				Orders
			</a>
			<a
				href="##"
				class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
			>
				<Package class="h-5 w-5" />
				Products
			</a>
			<a
				href="##"
				class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
			>
				<UsersRound class="h-5 w-5" />
				Customers
			</a>
			<a
				href="##"
				class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
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
	<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
	<Input
		type="search"
		placeholder="Search..."
		class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
	/>
</div>
