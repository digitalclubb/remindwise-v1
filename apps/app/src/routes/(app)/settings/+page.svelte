<script lang="ts">
	import { Button, Radio } from 'components';
	import Header from '../../../components/header/Header.svelte';
	import Input from 'components/input/Input.svelte';
	import { settingsSchema } from './schema';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const { form, errors, constraints, enhance } = superForm(data.form, {
		validators: settingsSchema,
	});
</script>

<svelte:head>
	<title>Account settings · remindwise.io</title>
</svelte:head>

<Header title="Settings" />

<form method="POST" action="?/updateSettings" novalidate use:enhance>
	<section>
		<h2 class="heading-3">Reminder settings</h2>
		<div>
			<Input
				fullWidth
				step="any"
				label="Notice period"
				type="number"
				id="noticePeriod"
				name="noticePeriod"
				aria-invalid={$errors.noticePeriod ? 'true' : undefined}
				bind:value={$form.noticePeriod}
				{...$constraints.noticePeriod} />

			{#if $errors.noticePeriod}
				<p class="error">{$errors.noticePeriod}</p>
			{/if}
		</div>

		<Radio
			legend="Interval"
			name="interval"
			options={[
				{ id: 'days', label: 'Days', value: 'DAYS' },
				{ id: 'months', label: 'Months', value: 'MONTHS' },
				{ id: 'years', label: 'Years', value: 'YEARS' },
			]}
			bind:group={$form.interval}
			constraints={$constraints.interval} />

		{#if $errors.interval}
			<p class="error">{$errors.interval}</p>
		{/if}
	</section>

	<section>
		<h2 class="heading-3">Account settings</h2>

		<input type="hidden" id="id" name="id" value={$form.id} />
		<div>
			<Input
				fullWidth
				label="Email address"
				type="text"
				id="email"
				name="email"
				aria-invalid={$errors.email ? 'true' : undefined}
				bind:value={$form.email}
				{...$constraints.email} />

			{#if $errors.email}
				<p class="error">{$errors.email}</p>
			{/if}
		</div>
		<div>
			<Input
				fullWidth
				label="First name"
				type="text"
				id="firstName"
				name="firstName"
				aria-invalid={$errors.firstName ? 'true' : undefined}
				bind:value={$form.firstName}
				{...$constraints.firstName} />

			{#if $errors.firstName}
				<p class="error">{$errors.firstName}</p>
			{/if}
		</div>

		<div>
			<Input
				fullWidth
				label="Last name"
				type="text"
				id="lastName"
				name="lastName"
				aria-invalid={$errors.lastName ? 'true' : undefined}
				bind:value={$form.lastName}
				{...$constraints.lastName} />

			{#if $errors.lastName}
				<p class="error">{$errors.lastName}</p>
			{/if}
		</div>
		<div class="currency">
			<label for="currency">Currency</label>
			<select name="currency" id="currency" bind:value={$form.currency}>
				<option value="">Select your currency</option>
				<option value="GBP">£ GBP</option>
				<option value="USD">$ USD</option>
				<option value="EUR">€ EUR</option>
				<option value="CAD">$ CAD</option>
				<option value="AUD">$ AUD</option>
				<option value="JPY">¥ JPY</option>
			</select>
		</div>

		<div class="actions">
			<Button type="submit">Update account</Button>
		</div>
	</section>
</form>

<style>
	form {
		max-width: 64rem;
		margin: 3.4rem;
		display: flex;
		flex-direction: column;
		gap: 3.4rem;
	}

	label {
		display: block;
		margin-right: 0.7rem;
		margin-bottom: 0.7rem;
		color: var(--remindwise-grey);
	}

	select {
		background-color: var(--white);
		border: 1px solid var(--greyed-out);
		border-radius: 0.6rem;
		padding: 0.9rem 1.4rem;
		width: 100%;
		box-sizing: border-box;
		cursor: pointer;
	}

	section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.actions {
		text-align: right;
		max-width: 64rem;
		margin-top: 3rem;
	}

	.currency {
		max-width: 18.8rem;
	}
</style>
