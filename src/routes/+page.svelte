<script lang="ts">
	import EventCard from '$lib/components/EventCard.svelte';
	import type { EventType } from '$lib/types';
	import { onMount } from 'svelte';

	let events: EventType[] = [];
	onMount(async () => {
		events = await (await fetch('/api')).json();
		//  fetch('/api', {
		//     method: 'POST',
		//     headers: {
		//       'Content-Type': 'application/json',
		//     },
		//     body: JSON.stringify(event_o),
		//   });
	});
</script>

<div class="flex h-full w-full ">
	<div class="flex w-[30%] flex-col justify-between border-r-2 border-r-slate-700 p-2 pr-4 text-lg">
		<div>
			<h1 class="mb-4 text-4xl font-bold">All Events In One Place</h1>
			<p class="mb-4">Herzlich willkommen auf unserer Veranstaltungsplattform!</p>
			<p>
				Hier finden Sie eine Übersicht über alle kommenden Events. Entdecken Sie interessante
				Veranstaltungen, melden Sie sich schnell und unkompliziert an und behalten Sie stets den
				Überblick über Ihre Teilnahmen. Nutzen Sie unsere Plattform, um Ihre Anmeldungen zu
				verwalten und bei Bedarf einfach zu stornieren. Starten Sie jetzt und verpassen Sie keine
				Veranstaltung mehr!
			</p>
		</div>
		<div>
			<p>Sind Sie Veranstalter?</p>
			<p class="mb-2">
				Loggen Sie sich ein, oder kontaktieren sie uns unter: <a
					class="underline"
					href="mailto:admin@verman.at">admin@verman.at</a
				>
			</p>
			<img class="w-full" src="/ver.png" alt="ver" />
		</div>
	</div>
	<div class="h-min w-full flex flex-wrap  justify-center">
		{#each events as event}
			<EventCard {event} />
		{/each}
	</div>
</div>
