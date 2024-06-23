<script lang="ts">
	import type { EventType } from '$lib/types';
	import { onMount } from 'svelte';
	import { loggedInUser } from '$lib/stores';
	import type { PageData } from './$types';
	import Button from '$lib/components/ui/button/button.svelte';
	import { CalendarIcon, MapPin, Info, Users, Trash2, Plus, Minus, Edit } from 'lucide-svelte';
	import { page } from '$app/stores';

	export let data: PageData;
	let event: EventType | undefined = undefined;
	onMount(async () => {
		const res = await fetch(`/api/${data.event_id}`);
		event = await res.json();
		console.log(event);
	});

	async function syncEvent() {
		event = await (
			await fetch('/api', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(event)
			})
		).json();
	}

	async function deleteEvent() {
		await fetch(`/api/${data.event_id}`, {
			method: 'DELETE'
		});
		location.href = '/';
	}
</script>

{#if event != undefined}
	<div class="ml-1">
		<div class="flex items-center">
			<h1 class="mb-2 mt-1 text-3xl font-bold">{event.title}</h1>
			{#if $loggedInUser != null && event.attendees.find((attendee) => attendee == $loggedInUser) == undefined}
				<Button
					on:click={() => {
						if (event) {
							event.attendees.push($loggedInUser);
							syncEvent();
						}
					}}
					variant="secondary"
					class="ml-2 flex h-10 px-2"
				>
					<Plus class="mr-1 h-5 w-5" />
					Register
				</Button>
			{:else if $loggedInUser != null && event.attendees.find((attendee) => attendee == $loggedInUser) != undefined}
				<Button
					on:click={() => {
						if (event) {
							event.attendees.splice(event.attendees.indexOf($loggedInUser), 1);
							syncEvent();
						}
					}}
					variant="secondary"
					class="ml-2 flex h-10  px-2"
				>
					<Minus class="mr-1 h-5 w-5" />
					Unregister
				</Button>
			{/if}

			{#if $loggedInUser == 'admin' || event.creator == $loggedInUser}
				{#if $loggedInUser != null}
					<a href="/edit-event/{data.event_id}">
						<Button variant="outline" class="ml-2 flex h-10 bg-slate-900 px-2">
							Edit <Edit class="ml-1 p-1" />
						</Button>
					</a>
				{/if}
			{/if}
		</div>
		<p class="mb-2 flex"><Info class="h-6 w-6" /> <span class="ml-2">{event.description}</span></p>
		<p class="mb-2 flex">
			<CalendarIcon class="h-6 w-6" />
			<span class="ml-2">{new Date(event.date).toISOString().replace('T', ' ').slice(0, 16)}</span>
		</p>
		<p class="mb-2 flex"><MapPin class="h-6 w-6" /> <span class="ml-2">{event.location}</span></p>
		<p class="mb-2 flex">
			<Users class="h-6 w-6" /> <span class="ml-2">Attendees ({event.attendees.length}):</span>
		</p>
		{#each event.attendees as attendee, i}
			<div class="my-0.5 flex h-8 w-48 items-center rounded border-[1px] border-slate-700 px-1">
				<p class="w-40 max-w-40 overflow-hidden text-ellipsis">{attendee}</p>
				{#if (event.creator == $loggedInUser || $loggedInUser == 'admin') && $loggedInUser != null}
					<button
						on:click={() => {
							if (event) {
								event.attendees.splice(i, 1);
								let attendees = event?.attendees;
								event.attendees = attendees;
								syncEvent();
							}
						}}
					>
						<Trash2
							class=" ml-1 cursor-pointer rounded stroke-red-500 p-1 duration-150 hover:bg-slate-800"
						/>
					</button>
				{/if}
			</div>
		{/each}
		{#if $loggedInUser == 'admin' || event.creator == $loggedInUser}
			<Button on:click={deleteEvent} class="mt-2 px-2 pl-3" variant="destructive"
				>Delete Event <Trash2 class="ml-1 p-1" /></Button
			>
		{/if}
	</div>
{/if}
