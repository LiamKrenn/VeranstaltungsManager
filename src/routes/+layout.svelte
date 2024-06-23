<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { LogIn, LogOut } from 'lucide-svelte';
	import '../app.pcss';
	import { loggedInUser } from '$lib/stores';
	import LogInPopup from '$lib/components/LogInPopup.svelte';

	function logOut() {
		loggedInUser.set(null);
	}
</script>

<div class="flex h-screen flex-col ">
	<div class="flex h-16 items-center justify-between border-b-2 border-b-slate-700 px-3">
    <div class="flex items-center">
      <a href="/">
        <h1 class="text-3xl hover:bg-slate-800 duration-150 cursor-pointer rounded p-2">Veranstaltungs Manager</h1>
      </a>
      {#if $loggedInUser != null}
      <Button variant="outline" class="ml-2 bg-slate-900" href="/registered">Registered Events</Button>
      <Button variant="outline" class="ml-2 bg-slate-900" href="/my-events">My Events</Button>
      <Button variant="outline" class="ml-2 bg-slate-900" href="/create-event">Create Event</Button>
      {/if}
    </div>
    
		{#if $loggedInUser == null}
			<LogInPopup />
		{:else}
			<Button on:click={logOut} class="bg-slate-900" variant="outline"
				>{$loggedInUser} <LogOut class="ml-2 p-0.5" /></Button
			>
		{/if}
	</div>
	<div class="w-full  grow p-2">
		<slot />
	</div>
</div>
