<style>
	main {
		display: grid;
		grid-template-columns: 10% 90%;
		grid-template-rows: auto;
		grid-template-areas: 'navigation content';
		min-height: 100vh;
	}

	div {
		grid-area: content;
	}
</style>

<script lang="ts">
	import Navigation from '../components/navigation/Navigation.svelte';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<main>
	<Navigation />
	<div>
		<slot />
	</div>
</main>
