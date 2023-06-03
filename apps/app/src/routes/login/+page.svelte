<script lang="ts">
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';

	export let data;
</script>

<main>
	<div>
		<h1>Login</h1>
		<Auth
			additionalData="{undefined}"
			supabaseClient="{data.supabase}"
			view="sign_in"
			redirectTo="{`${data.url}/logging-in?redirect=/`}"
			showLinks="{true}"
			appearance="{{ theme: ThemeSupa }}"
			providers="{['google', 'facebook', 'twitter']}"
			socialLayout="horizontal"
		/>
	</div>
</main>

<style>
	main {
		display: grid;
		place-items: center;
		min-height: 100vh;
	}

	main > div {
		width: 40rem;
		border: solid 1px #d1d1d1;
		border-radius: 0.2rem;
		padding: 4rem;
	}
</style>
