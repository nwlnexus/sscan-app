<script lang="ts">
	import '../app.postcss';
	import {
		AppBar,
		autoModeWatcher,
		Drawer,
		initializeStores,
		getDrawerStore,
		type DrawerSettings
	} from '@skeletonlabs/skeleton';
	import { Menu } from 'lucide-svelte';
	import { onMount } from 'svelte';

	initializeStores();
	const drawerStore = getDrawerStore();
	const menu: DrawerSettings = {
		id: 'main-menu',
		rounded: 'rounded-xl',
		width: 'w-[280px]',
		padding: 'p-4'
	};
	onMount(() => {
		autoModeWatcher();
	});
</script>

<Drawer />

<div class="grid h-screen grid-rows-[auto_1fr_auto]">
	<!-- Header -->
	<header>
		<AppBar
			gridColumns="grid-cols-3"
			slotDefault="place-self-center"
			slotTrail="place-content-end"
			padding="p-4"
		>
			<svelte:fragment slot="lead"
				><button
					type="button"
					class="variant-ghost-surface btn-icon rounded-md"
					on:click={() => drawerStore.open(menu)}><Menu /></button
				></svelte:fragment
			>
			<h4 class="h4"><span class="gradient-heading">SSCAN</span></h4>
		</AppBar>
	</header>
	<!-- Grid Columns -->
	<div class="grid grid-cols-1 md:grid-cols-[auto_1fr]">
		<!-- Left Sidebar -->
		<!--		<aside class="p-4">-->
		<!--			<AppRail></AppRail>-->
		<!--		</aside>-->
		<!-- Page -->
		<main class="space-y-4 p-4">
			<slot />
		</main>
	</div>
</div>
