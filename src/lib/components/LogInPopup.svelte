<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { loggedInUser } from '$lib/stores';
	import { LogIn } from 'lucide-svelte';

  let username = '';

  function logIn() {
    loggedInUser.set(username);
  }
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<Button type="submit" class="bg-slate-900" variant="outline">Log In <LogIn class="ml-2 p-0.5" /></Button
		></Dialog.Trigger
	>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Log In</Dialog.Title>
		</Dialog.Header>
    <p>Username</p>
		<Input bind:value={username} type="text" placeholder="user"/>
		<Dialog.Footer>
			<Button on:click={logIn} type="submit">Log In <LogIn class="ml-2 p-0.5" /></Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
