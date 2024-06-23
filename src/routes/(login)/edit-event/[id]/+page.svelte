<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	import EventCard from '$lib/components/EventCard.svelte';
	import type { EventType } from '$lib/types';
	import { onMount } from 'svelte';
	import { loggedInUser } from '$lib/stores';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	let event: EventType = {
		title: '',
		description: '',
		date: 0,
		location: '',
		attendees: [],
		creator: $loggedInUser || ''
	};

	let date = new Date().toJSON().slice(0, 10);
	let time = new Date().toJSON().slice(11, 16);

	async function updateEvent() {
		event.date = new Date(`${date}T${time}`).getTime();
		await fetch('/api', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(event)
		});
		location.href = '/my-events';
	}

	onMount(async () => {
		event = await (await fetch(`/api/${data.id}`)).json();
		date = new Date(event.date).toJSON().slice(0, 10);
		time = new Date(event.date).toJSON().slice(11, 16);
	});
</script>

{#if event != null && (event.creator == $loggedInUser || $loggedInUser == 'admin')}
	<h1 class="text-2xl font-bold">Edit Event</h1>
	<p class="mt-2">Title</p>
	<Input class="my-1 w-52 bg-slate-950" bind:value={event.title} />
	<p class="">Description</p>
	<Input class="my-1 w-52 bg-slate-950" bind:value={event.description} />
	<p class="">Location</p>
	<Input class="my-1 w-52 bg-slate-950" bind:value={event.location} />
	<p class="">Date and Time</p>
	<Input class="my-1 w-52 bg-slate-950" bind:value={date} type="date" />
	<Input class="my-1 w-52 bg-slate-950" bind:value={time} type="time" />
	<Button on:click={updateEvent} class="mt-1 h-8 w-52" variant="secondary">Edit Event</Button>
{:else}
	You are not authorized to edit this event.
{/if}
