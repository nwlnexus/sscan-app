<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	import Home from 'lucide-svelte/icons/house';
	import Package2 from 'lucide-svelte/icons/package-2';
</script>

<nav class="flex flex-col items-center gap-4 px-2 py-4">
	<a
		href="##"
		class="bg-primary text-primary-foreground group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:h-8 md:w-8 md:text-base"
	>
		<Package2 class="h-4 w-4 transition-all group-hover:scale-110" />
		<span class="sr-only">NWL </span>
	</a>
	<Tooltip.Root>
		<Tooltip.Trigger asChild let:builder>
			<a
				href="##"
				class="text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
				use:builder.action
				{...builder}
			>
				<Home class="h-5 w-5" />
				<span class="sr-only">Dashboard</span>
			</a>
		</Tooltip.Trigger>
		<Tooltip.Content side="right">Dashboard</Tooltip.Content>
	</Tooltip.Root>
</nav>
