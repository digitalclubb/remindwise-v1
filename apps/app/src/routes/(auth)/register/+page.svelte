<script lang="ts">
	import { enhance } from '$app/forms';

	export let form;
</script>

<svelte:head>
	<title>remindwise.io - Register</title>
</svelte:head>

<h1>Register</h1>
<form method="post" use:enhance>
	<label for="email">Email Address</label>
	<input id="email" name="email" type="email" value={form?.email ?? ''} />
	<label for="password">Password</label>
	<input
		id="password"
		name="password"
		type="password"
		autocomplete="current-password"
	/>

	<button>Register</button>
	<a href="/login">Already have an account? Sign in</a>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
</style>
