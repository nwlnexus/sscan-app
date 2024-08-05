<script lang="ts">
	import '../app.css';
	import { AppBar, AppRail, autoModeWatcher } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	onMount(() => {
		autoModeWatcher();
	});
</script>

<div class="grid h-screen grid-rows-[auto_1fr_auto]">
	<!-- Header -->
	<header>
		<AppBar
			gridColumns="grid-cols-3"
			slotDefault="place-self-center"
			slotTrail="place-content-end"
			padding="p-4"
		>
			<svelte:fragment slot="lead">(actions)</svelte:fragment>
			SSCAN
			<svelte:fragment slot="trail">(actions)</svelte:fragment>
		</AppBar>
	</header>
	<!-- Grid Columns -->
	<div class="grid grid-cols-1 md:grid-cols-[auto_1fr]">
		<!-- Left Sidebar -->
		<aside class="p-4">
			<AppRail></AppRail>
		</aside>
		<!-- Page -->
		<main class="space-y-4 p-4">
			<slot />
		</main>
	</div>
</div>
