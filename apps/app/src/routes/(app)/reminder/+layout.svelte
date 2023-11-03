<script lang="ts">
	import { page, navigating } from '$app/stores';
	import { enhance } from '$app/forms';
	import Header from '../../../components/header/Header.svelte';
	import type { LayoutData } from './$houdini';
	import type {
		getReminderStore,
		getReminder$result,
		QueryResult,
	} from '$houdini';

	export let data: LayoutData;

	$: ({ getCategories } = data);

	let result = {} as QueryResult<getReminder$result>;

	$: reminder = result.data?.reminders?.list[0].reminder;

	$: ($page.data.getReminder as getReminderStore)?.subscribe((value) => {
		result = value;
	});

	$: categories = $getCategories.data?.categories?.list;

	$: type = reminder?.type || '';
	$: autoRenew = String(reminder?.autoRenewal) || '';
	$: frequency = reminder?.frequency || '';

	const previousPage = $navigating?.from ? $navigating.from.url.pathname : '/';
	const previousCategory = previousPage.substring(
		previousPage.indexOf('category') + 9
	);
</script>

<Header title={$page.data.title} />

<div class="body">
	<form method="POST" action={$page.data.action} use:enhance>
		<div>
			<label for="categoryId">Category</label>
			<select
				name="categoryId"
				id="categoryId"
				required
				value={reminder?.category?.id || categories?.[0].category.id}>
				{#if $getCategories.fetching}
					<option value="">Loading...</option>
				{:else if categories}
					{#each categories as category}
						<option
							value={category.category.id}
							selected={previousCategory === category.category.name}
							>{category.category.name}</option>
					{/each}
				{/if}
			</select>
		</div>

		<div>
			<label for="name">Reminder name<i aria-hidden="true">*</i></label>
			<input
				type="text"
				name="name"
				id="name"
				placeholder="Enter a name for your reminder"
				value={reminder?.name || ''}
				required />
		</div>

		<fieldset class="options">
			<legend>What type of reminder is this?<i aria-hidden="true">*</i></legend>
			<div class="option option-first">
				<input
					type="radio"
					name="type"
					id="ongoing"
					value="ONGOING"
					bind:group={type}
					required />
				<label for="ongoing">Ongoing subscription</label>
			</div>
			<div class="option option-last">
				<input
					type="radio"
					name="type"
					id="single"
					value="SINGLE"
					bind:group={type}
					required />
				<label for="single">Single record</label>
			</div>
		</fieldset>

		<div>
			<label for="company">Company<i aria-hidden="true">*</i></label>
			<input
				type="text"
				name="company"
				id="company"
				placeholder="Enter the name of the company"
				value={reminder?.company || ''}
				required />
		</div>

		<div class="columns">
			<div>
				<label for="cost">
					{#if type === 'SINGLE'}
						What is the total?<i aria-hidden="true">*</i>
					{:else}
						What is the re-occuring cost?<i aria-hidden="true">*</i>
					{/if}
				</label>
				<div class="currency">
					<span>&pound;</span>
					<input
						type="number"
						min="0"
						step="any"
						name="cost"
						id="cost"
						placeholder="How much is charged?"
						value={reminder?.cost || ''}
						required />
				</div>
			</div>

			{#if type === 'ONGOING'}
				<fieldset class="options">
					<legend>When is it charged?</legend>
					<div class="option option-first">
						<input
							type="radio"
							name="frequency"
							id="annual"
							value="ANNUAL"
							required
							bind:group={frequency} />
						<label for="annual">Annual</label>
					</div>
					<div class="option option-last">
						<input
							type="radio"
							name="frequency"
							id="monthly"
							value="MONTHLY"
							required
							bind:group={frequency} />
						<label for="monthly">Monthly</label>
					</div>
				</fieldset>
			{/if}
		</div>

		<div class="columns">
			<div>
				<label for="date"
					>{#if type === 'SINGLE'}
						What is the date?
					{:else}
						When is it due for renewal?
					{/if}</label>
				<input type="date" name="date" id="date" value={reminder?.date || ''} />
			</div>

			{#if type === 'ONGOING'}
				<fieldset class="options">
					<legend>Will it auto-renew?</legend>
					<div class="option option-first">
						<input
							type="radio"
							name="autoRenew"
							id="yes"
							value="true"
							bind:group={autoRenew} />
						<label for="yes">Yes</label>
					</div>
					<div class="option option-last">
						<input
							type="radio"
							name="autoRenew"
							id="no"
							value="false"
							bind:group={autoRenew} />
						<label for="no">No</label>
					</div>
				</fieldset>
			{/if}
		</div>

		<div>
			<label for="notes">Notes</label>
			<textarea
				name="notes"
				placeholder="Enter things like policy number, quick contact details for the company etc."
				value={reminder?.notes || ''} />
		</div>

		<div>
			<label for="documents">Would you like to upload any documents?</label>
			<input type="file" id="documents" name="documents" />
		</div>

		<div class="submit">
			<!-- Add on /add, Save on /edit-->
			<svelte:component this={$page.data.submit} />
		</div>

		<input
			type="hidden"
			name="userId"
			id="userId"
			value={$page.data.session?.user.id} />
	</form>
</div>

<style>
	.body {
		padding: 2.4rem 4.2rem;
	}

	form {
		max-width: 64rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	select {
		display: block;
		width: 100%;
	}

	label,
	legend {
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
		width: 28.5rem;
	}

	fieldset {
		all: unset;
	}

	.options {
		display: flex;
		flex: 1;
	}

	.option {
		flex: 1;
	}

	.option input {
		position: absolute;
		visibility: hidden;
	}

	.option label {
		background-color: var(--cream-light);
		border-top: 1px solid var(--cream);
		border-bottom: 1px solid var(--cream);
		padding-top: 1rem;
		padding-bottom: 1rem;
		margin-bottom: 0;
		width: 100%;
		text-align: center;
	}

	.option-first label {
		border-top-left-radius: 2rem;
		border-bottom-left-radius: 2rem;
		border-right: 1px solid var(--cream);
	}

	.option-last label {
		border-top-right-radius: 2rem;
		border-bottom-right-radius: 2rem;
	}

	.option label:hover {
		background-color: var(--cream);
		cursor: pointer;
	}

	.options input[type='radio']:checked + label {
		background-color: var(--orange);
		color: var(--white);
	}

	.columns {
		display: flex;
		flex-wrap: wrap;
		gap: 4rem;
	}

	.currency {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.currency input {
		width: 26rem;
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

	.submit {
		display: flex;
		justify-content: flex-end;
		margin-top: 6rem;
	}
</style>
