<script lang="ts">
	import { Tooltip } from '@sscan/ui';
	import { House as Home, Disc3, Package2 } from 'lucide-svelte';
</script>

<nav class="flex flex-col items-center gap-4 px-2 py-4">
	<a
		href="##"
		class="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
	>
		<Package2 class="h-4 w-4 transition-all group-hover:scale-110" />
		<span class="sr-only">NWL NEXUS</span>
	</a>
	<Tooltip.Root>
		<Tooltip.Trigger asChild let:builder>
			<a
				href="##"
				class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
				use:builder.action
				{...builder}
			>
				<Home class="h-5 w-5" />
				<span class="sr-only">Dashboard</span>
			</a>
		</Tooltip.Trigger>
		<Tooltip.Content side="right">Dashboard</Tooltip.Content>
	</Tooltip.Root>
	<Tooltip.Root>
		<Tooltip.Trigger asChild let:builder>
			<a
				href="##"
				class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
				use:builder.action
				{...builder}
			>
				<Disc3 class="h-5 w-5" />
				<span class="sr-only">Orders</span>
			</a>
		</Tooltip.Trigger>
		<Tooltip.Content side="right">Orders</Tooltip.Content>
	</Tooltip.Root>
</nav>
