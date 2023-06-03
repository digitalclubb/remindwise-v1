<script lang="ts">
	import {
		createClient,
		cacheExchange,
		fetchExchange,
		setContextClient,
	} from '@urql/svelte';
	import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from '$env/static/public';

	import Sprite from '../components/icons/Sprite.svelte';
	import Navigation from '../components/navigation/Navigation.svelte';

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { user } from '../stores';

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

	$: if (session) {
		// URQL stuff below
		const headers = {
			apikey: PUBLIC_SUPABASE_KEY,
			authorization: `Bearer ${session?.access_token}`,
		};

		const client = createClient({
			url: `${PUBLIC_SUPABASE_URL}/graphql/v1`,
			exchanges: [cacheExchange, fetchExchange],
			fetchOptions: function createFetchOptions() {
				return { headers };
			},
		});

		setContextClient(client);

		user.set(session.user);
	}
</script>

<main>
	<Navigation />
	<button on:click="{async () => await supabase.auth.signOut()}"
		>Sign out</button
	>
	<div>
		<slot />
	</div>
</main>
<svelte:component this="{Sprite}" />

<style>
	main {
		display: grid;
		grid-template-columns: 15% 85%;
		grid-template-rows: auto;
		grid-template-areas: 'navigation content';
		min-height: 100vh;
	}

	div {
		grid-area: content;
		padding: 1.8rem 2.6rem;
	}
</style>
