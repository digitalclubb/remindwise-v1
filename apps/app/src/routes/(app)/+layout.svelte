<script lang="ts">
	import Sprite from '../../components/icons/Sprite.svelte';
	import Navigation from '../../components/navigation/Navigation.svelte';

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;
	$: ({ supabase, session, getCategories, getSettings } = data);
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
	<Navigation categoriesStore={getCategories} settingsStore={getSettings} />
	<div>
		<slot />
	</div>
</main>
<svelte:component this={Sprite} />

<style>
	main {
		display: grid;
		grid-template-columns: 100%;
		grid-template-rows: 70px 1fr;
		grid-template-areas:
			'navigation'
			'content   ';
		min-height: 100vh;
	}

	@media screen and (min-width: 768px) {
		main {
			grid-template-columns: 25.8rem 1fr;
			grid-template-rows: auto;
			grid-template-areas: 'navigation content';
		}
	}
</style>
