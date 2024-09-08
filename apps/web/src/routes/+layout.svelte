<script lang="ts">
	import '@sscan/ui/styles/global.css';

	import { ModeWatcher } from 'mode-watcher';

	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<ModeWatcher />

{#if data.session}
	<slot />
{:else}
	<slot />
{/if}
