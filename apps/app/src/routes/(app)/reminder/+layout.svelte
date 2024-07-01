<script lang="ts">
	import { page } from '$app/stores';
	import Header from '../../../components/header/Header.svelte';
	import { getCurrency } from '../../../utils/currency';
	import type { LayoutData } from './$houdini';
	import { superForm } from 'sveltekit-superforms/client';
	import { reminderSchema } from './schema';
	import Radio from '../../../components/radio/Radio.svelte';
	import Input from '../../../components/input/Input.svelte';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import FileUpload from '../../../components/fileupload/FileUpload.svelte';
	import DataList from '../../../components/datalist/DataList.svelte';

	export let data: LayoutData;

	const superform = superForm(data.form, {
		validators: zodClient(reminderSchema),
	});

	const { form, errors, constraints, enhance } = superform;

	$: ({ GetCategories, GetSettings } = data);

	$: currency = $GetSettings.data?.settings?.list[0].setting.currency || '';
	$: currencySymbol = getCurrency(currency);

	$: categories = $GetCategories.data?.categories?.list.filter((category) =>
		category.category.name
			.toLowerCase()
			.startsWith($form.category?.toLowerCase())
	);
</script>

<Header title={$page.data.title} />

<div class="body">
	<form
		novalidate
		method="POST"
		action={$page.data.action}
		enctype="multipart/form-data"
		use:enhance>
		<div class="category">
			<DataList {superform} field="category" {categories} />

			<input
				type="hidden"
				value={categories?.[0]?.category.id || ''}
				name="categoryId" />

			{#if $errors.category}
				<p class="error">{$errors.category}</p>
			{/if}
		</div>

		<div>
			<Input
				label="Reminder name"
				type="text"
				name="name"
				id="name"
				placeholder="Enter a name for your reminder"
				aria-invalid={$errors.name ? 'true' : undefined}
				bind:value={$form.name}
				fullWidth
				{...$constraints.name} />
			{#if $errors.name}
				<p class="error">{$errors.name}</p>
			{/if}
		</div>

		<div>
			<Radio
				required
				legend="What type of reminder is this?"
				name="type"
				options={[
					{ id: 'ongoing', label: 'Ongoing subscription', value: 'ONGOING' },
					{ id: 'single', label: 'Single record', value: 'SINGLE' },
				]}
				bind:group={$form.type}
				constraints={$constraints.type}
				aria-invalid={$errors.type ? 'true' : undefined} />

			{#if $errors.type}
				<p class="error">{$errors.type}</p>
			{/if}
		</div>

		<div>
			<Input
				label="Company"
				type="text"
				name="company"
				id="company"
				fullWidth
				placeholder="Enter the name of the company"
				aria-invalid={$errors.company ? 'true' : undefined}
				bind:value={$form.company}
				{...$constraints.company} />

			{#if $errors.company}
				<p class="error">{$errors.company}</p>
			{/if}
		</div>

		<div class="columns">
			<div>
				<label for="cost">
					{#if $form.type === 'SINGLE'}
						What is the total?<i aria-hidden="true">*</i>
					{:else}
						What is the re-occuring cost?<i aria-hidden="true">*</i>
					{/if}
				</label>
				<div class="currency">
					<span>{currencySymbol}</span>
					<input
						type="number"
						step="any"
						name="cost"
						id="cost"
						placeholder="How much is charged?"
						aria-invalid={$errors.cost ? 'true' : undefined}
						bind:value={$form.cost}
						{...$constraints.cost} />
				</div>
				{#if $errors.cost}
					<p class="error">{$errors.cost}</p>
				{/if}
			</div>

			{#if $form.type === 'ONGOING'}
				<div class="options-wrapper">
					<Radio
						legend="Will it auto-renew?"
						name="autoRenew"
						options={[
							{ id: 'yes', label: 'Yes', value: true },
							{ id: 'no', label: 'No', value: false },
						]}
						bind:group={$form.autoRenew}
						constraints={$constraints.autoRenew}
						aria-invalid={$errors.autoRenew ? 'true' : undefined} />

					{#if $errors.autoRenew}
						<p class="error">{$errors.autoRenew}</p>
					{/if}
				</div>
			{/if}
		</div>

		<div class="columns">
			{#if $form.type === 'ONGOING'}
				<div class="options-wrapper">
					<Radio
						required
						legend="When is it charged?"
						name="frequency"
						options={[
							{ id: 'annual', label: 'Annual', value: 'ANNUAL' },
							{ id: 'monthly', label: 'Monthly', value: 'MONTHLY' },
						]}
						bind:group={$form.frequency}
						constraints={$constraints.frequency}
						aria-invalid={$errors.frequency ? 'true' : undefined} />

					{#if $errors.frequency}
						<p class="error">{$errors.frequency}</p>
					{/if}
				</div>
			{/if}

			<div>
				<label for="date"
					>{#if $form.type === 'SINGLE'}
						What is the date?
					{:else}
						When is it due for renewal?
					{/if}</label>

				<fieldset class="date" id="date">
					<Input type="number" min="1" max="31" placeholder="DD" fullWidth />
					<Input type="number" min="1" max="12" placeholder="MM" fullWidth />
				</fieldset>
				<!-- <input
					type="date"
					name="date"
					id="date"
					aria-invalid={$errors.date ? 'true' : undefined}
					bind:value={$form.date}
					{...$constraints.date} /> -->

				{#if $errors.date}
					<p class="error">{$errors.date}</p>
				{/if}
			</div>
		</div>

		<div>
			<label for="notes">Notes</label>
			<textarea
				name="notes"
				id="notes"
				placeholder="Enter things like policy number, quick contact details for the company etc."
				aria-invalid={$errors.notes ? 'true' : undefined}
				bind:value={$form.notes}
				{...$constraints.notes} />

			{#if $errors.notes}
				<p class="error">{$errors.notes}</p>
			{/if}
		</div>

		<FileUpload uploads={data.files} />

		<slot />

		<input
			type="hidden"
			name="userId"
			id="userId"
			value={$page.data.session?.user.id} />
	</form>
</div>

<style>
	form {
		max-width: 64rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	label {
		display: inline-block;
		margin-bottom: 1rem;
	}

	i {
		font-style: normal;
		color: var(--red);
	}

	input {
		display: block;
		border: 1px solid var(--greyed-out);
		border-radius: 0.6rem;
		padding: 0.9rem 1.4rem;
		width: 100%;
	}

	.options-wrapper {
		flex: 1;
	}

	.currency {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.currency span {
		color: var(--cream-dark);
		font-size: 2.4rem;
	}

	textarea {
		display: block;
		border: 1px solid var(--greyed-out);
		border-radius: 0.6rem;
		padding: 0.9rem 1.4rem;
		width: 100%;
		min-height: 25rem;
	}

	.types {
		color: var(--grey-light);
	}

	.date {
		border: none;
		display: flex;
		padding: 0;
		margin: 0;
		gap: 1rem;
	}

	@media screen and (min-width: 500px) {
		.columns {
			display: flex;
			flex-wrap: wrap;
			gap: 4rem;
		}

		.options {
			margin-top: 0;
		}

		input {
			width: 28.5rem;
		}

		.currency input {
			width: 26rem;
		}
	}
</style>
