<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Input, Link } from 'components';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { registerSchema } from './schema';

	export let data: PageData;

	const { form, errors, constraints, message } = superForm(data.form, {
		validators: registerSchema,
	});
</script>

<svelte:head>
	<title>Create a new account · remindwise.io</title>
</svelte:head>

<div class="boxes">
	<div class="box box-manual">
		<h1 class="heading-3">Sign up</h1>
		<form method="post" use:enhance novalidate>
			<Input
				label="Email"
				id="email"
				name="email"
				type="email"
				autocomplete="email"
				placeholder="Enter your email address"
				aria-invalid={$errors.email ? 'true' : undefined}
				bind:value={$form.email}
				{...$constraints.email} />

			{#if $errors.email}
				<p class="error">{$errors.email}</p>
			{/if}
			<Input
				label="Password"
				id="password"
				name="password"
				type="password"
				autocomplete="new-password"
				placeholder="Enter your password"
				aria-invalid={$errors.password ? 'true' : undefined}
				bind:value={$form.password}
				{...$constraints.password} />
			{#if $errors.password}
				<p class="error">{$errors.password}</p>
			{/if}
			<div class="login">
				<Button>Sign up</Button>
			</div>

			{#if $message}
				<p class="error">{$message}</p>
			{/if}
		</form>
	</div>
	<div class="box box-social">
		<h2 class="heading-5">Or</h2>
		<ul class="">
			<li>
				<!-- svelte-ignore a11y-invalid-attribute -->
				<a href="" class="social-login">
					<img src="/icon-facebook.svg" alt="" /> Sign up with Facebook
				</a>
			</li>
			<li>
				<!-- svelte-ignore a11y-invalid-attribute -->
				<a href="" class="social-login"
					><img src="/icon-google.svg" alt="" /> Sign up with Google
				</a>
			</li>
			<li>
				<!-- svelte-ignore a11y-invalid-attribute -->
				<a href="" class="social-login"
					><img src="/icon-x.svg" alt="" /> Sign up with X</a>
			</li>
		</ul>
	</div>
</div>

<p>
	<span>Already have an account?</span>
	<Link href="/login" type="button">Login now</Link>
</p>

<style>
	.error {
		color: var(--red);
		margin-top: 1rem;
	}
</style>
