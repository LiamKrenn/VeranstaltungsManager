<script lang="ts">
	import EventCard from '$lib/components/EventCard.svelte';
	import type { EventType } from '$lib/types';
	import { onMount } from 'svelte';
	import { loggedInUser } from '$lib/stores';

	let events: EventType[] = [];
	onMount(async () => {
		events = await (await fetch(`/api/created/${$loggedInUser}`)).json();
		console.log(events);
	});
</script>

<div class="flex  w-full flex-wrap justify-center">
	{#if events.length > 0}
		{#each events as event}
			<EventCard {event} />
		{/each}
	{:else}
		No Events.
	{/if}
</div>
