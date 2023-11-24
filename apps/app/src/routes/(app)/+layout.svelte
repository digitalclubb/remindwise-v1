<script lang="ts">
	import IconsCategory from '../../components/icons/Categories.svelte';
	import IconsUI from '../../components/icons/Icons.svelte';
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
	<div class="content">
		<slot />
	</div>
</main>
<svelte:component this={IconsUI} />
<svelte:component this={IconsCategory} />

<style>
	main {
		display: grid;
		grid-template-columns: 100%;
		grid-template-areas:
							'header'
							'navigation'
							'content';
		min-height: 100vh;
	}

	.content {
		grid-area: content;
	}

	@media screen and (min-width: 768px) {
		main {
			grid-template-columns: 25.8rem 1fr;
			grid-template-areas: 'header content'
								'navigation content';
		}
	}
</style>
