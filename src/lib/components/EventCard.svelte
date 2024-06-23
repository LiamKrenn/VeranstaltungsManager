<script lang="ts">
	import { type EventType } from '$lib/types';
	import * as Card from '$lib/components/ui/card';
	import { CalendarIcon } from 'lucide-svelte';

	export let event: EventType;
</script>

<a href="/event/{event._id}">
  <Card.Root
	class="m-2 flex h-24 w-60 cursor-pointer flex-col justify-between bg-slate-900 px-2 py-1.5 text-sm duration-150 hover:bg-slate-800"
>
	<div>
		<p class="mb-1 font-semibold">{event.title}</p>
		<p class="text-xs">{event.description}</p>
	</div>
	<div class="mb-0.5 flex text-xs opacity-70">
		<CalendarIcon class="h-4 w-4" />
		<p class="ml-1">{new Date(event.date).toISOString().replace('T', ' ').slice(0, 16)}</p>
	</div>
</Card.Root>
</a>

