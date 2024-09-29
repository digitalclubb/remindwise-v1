<script lang="ts">
	import IconsCategory from '../../components/icons/Categories.svelte';
	import IconsUI from '../../components/icons/Icons.svelte';
	import Navigation from '../../components/navigation/Navigation.svelte';
	import Skeleton from '../../components/skeleton/Skeleton.svelte';

	import { goto, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { navigating, page } from '$app/stores';

	export let data;
	$: ({ supabase, session, GetCategories, GetSettings } = data);
	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (!newSession && $page.url.pathname !== '/settings/update-password') {
				/**
				 * Queue this as a task so the navigation won't prevent the
				 * triggering function from completing
				 */
				setTimeout(() => {
					goto('/login', { invalidateAll: true });
				});
			}
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<main>
	<Navigation categoriesStore={GetCategories} settingsStore={GetSettings} />
	<div class="content">
		{#if $navigating}
			<Skeleton />
		{:else}
			<slot />
		{/if}
	</div>
</main>
<svelte:component this={IconsUI} />
<svelte:component this={IconsCategory} />

<style>
	@media screen and (min-width: 1024px) {
		main {
			display: grid;
			grid-template-columns: 25.8rem 1fr;
			grid-template-areas: 'navigation content';
			min-height: 100vh;
		}

		.content {
			grid-area: content;
		}
	}
</style>
