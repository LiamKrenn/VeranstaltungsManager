<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { LogIn } from 'lucide-svelte';
	import '../app.css';
</script>

<div class="flex h-screen flex-col">
	<div class="flex h-16 items-center justify-between border-b-2 border-b-slate-700 px-3">
		<h1 class="cursor-default text-3xl">Veranstaltungs Manager</h1>
		<Button class="bg-slate-900" variant="outline">Log In <LogIn class="ml-2 p-0.5" /></Button>
	</div>
	<div class="w-full grow p-2">
		<slot />
	</div>
</div>
