<script lang="ts">
	import { Button, Input } from 'components';
	import Header from '../../../../components/header/Header.svelte';
	import { updatePasswordSchema } from '../schema';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const { form, errors, constraints, message, enhance } = superForm(data.form, {
		validators: updatePasswordSchema,
	});
</script>

<Header title="Settings" />

<section>
	<h2>Update Password</h2>

	<form method="post" use:enhance novalidate>
		<Input
			label="Password"
			id="password"
			name="password"
			type="password"
			placeholder="Enter your new password"
			autocomplete="new-password"
			aria-invalid={$errors.password ? 'true' : undefined}
			bind:value={$form.password}
			{...$constraints.password} />

		{#if $errors.password}
			<p class="error">{$errors.password}</p>
		{/if}

		<Button>Update password</Button>
	</form>

	{#if $message}
		<p class="error">{$message}</p>
	{/if}
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
