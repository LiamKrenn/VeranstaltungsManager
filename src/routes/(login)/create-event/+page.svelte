<script lang="ts">
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
    creator: $loggedInUser || '',
  };

  let date = (new Date()).toJSON().slice(0, 10);
  let time = (new Date()).toJSON().slice(11,16);
  
  async function createEvent() {
    event.date = new Date(`${date}T${time}`).getTime();
    await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
    location.href = '/my-events';
  }
</script>

<h1 class="text-2xl font-bold">Create Event</h1>
<p class="mt-2">Title</p>
<Input class="my-1 bg-slate-950 w-52" bind:value={event.title}  />
<p class="">Description</p>
<Input class="my-1 bg-slate-950 w-52" bind:value={event.description}  />
<p class="">Location</p>
<Input class="my-1 bg-slate-950 w-52" bind:value={event.location}  />
<p class="">Date and Time</p>
<Input class="my-1 bg-slate-950 w-52" bind:value={date}  type="date" />
<Input class="my-1 bg-slate-950 w-52" bind:value={time}  type="time" />
<Button on:click={createEvent} class="h-8 w-52 mt-1" variant="secondary">Create Event</Button>
