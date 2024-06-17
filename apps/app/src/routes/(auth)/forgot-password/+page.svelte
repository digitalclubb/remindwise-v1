<script lang="ts">
	import Button from '../../../components/button/Button.svelte';
	import Input from '../../../components/input/Input.svelte';
	import type { PageData } from './$types';
	import { forgotPasswordSchema } from './schema';
	import { superForm } from 'sveltekit-superforms/client';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: PageData;

	const { form, errors, constraints, message, enhance } = superForm(data.form, {
		validators: zodClient(forgotPasswordSchema),
	});
</script>

<svelte:head>
	<title>Recover password · remindwise.io</title>
</svelte:head>

<div class="boxes">
	<div class="box box-manual">
		<h1 class="heading-3">Forgot password</h1>

		<form method="post" use:enhance novalidate>
			<Input
				label="Email"
				id="email"
				name="email"
				type="email"
				placeholder="Enter your email address"
				aria-invalid={$errors.email ? 'true' : undefined}
				bind:value={$form.email}
				{...$constraints.email} />

			{#if $errors.email}
				<p class="error">{$errors.email}</p>
			{/if}

			<div class="login">
				<Button>Reset password</Button>
			</div>

			{#if $message}
				<p class="error">{$message}</p>
			{/if}
		</form>

		<a href="/login" class="forgotten">Back to login</a>
	</div>
</div>

<style>
	.box-manual {
		background-color: var(--white);
		border-radius: 0.6rem;
	}

	@media screen and (min-width: 1024px) {
		.box-manual {
			padding: 2rem 4.8rem 4rem 3.8rem;
		}
	}

	p {
		color: var(--remindwise-grey);
	}
</style>
