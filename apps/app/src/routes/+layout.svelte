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

	// URQL stuff below
	const headers = {
		apikey: PUBLIC_SUPABASE_KEY,
		authorization: `Bearer ${PUBLIC_SUPABASE_KEY}`,
	};

	const client = createClient({
		url: `${PUBLIC_SUPABASE_URL}/graphql/v1`,
		exchanges: [cacheExchange, fetchExchange],
		fetchOptions: function createFetchOptions() {
			return { headers };
		},
	});

	setContextClient(client);
</script>

<main>
	<Navigation />
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
