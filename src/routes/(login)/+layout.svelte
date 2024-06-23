<script lang="ts">
	import { loggedInUser } from '$lib/stores';
</script>

{#if $loggedInUser != null}
	<slot />
{:else}
	You need to log in to view this page.
{/if}
