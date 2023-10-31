<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Input } from 'components';

	export let form;
</script>

<h1>Settings</h1>

<section>
	<h2>Update Password</h2>

	{#if form?.success || form?.error}
		<p>{form?.message}</p>
	{/if}

	<form method="post" use:enhance>
		<Input
			label="Password"
			id="password"
			name="password"
			type="password"
			placeholder="Enter your new password"
			autocomplete="new-password"
			required />
		<Button>Update password</Button>
	</form>
</section>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	section {
		padding: 2rem;
	}
</style>
