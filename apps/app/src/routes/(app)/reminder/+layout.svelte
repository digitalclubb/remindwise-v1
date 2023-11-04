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
	let showCategories: boolean;
	$: ({ getCategories } = data);

	let result = {} as QueryResult<getReminder$result>;

	$: reminder = result.data?.reminders?.list[0].reminder;

	$: ($page.data.getReminder as getReminderStore)?.subscribe((value) => {
		result = value;
	});

	$: categories = $getCategories.data?.categories?.list.filter((category) =>
		category.category.name.startsWith(categoryName)
	);

	$: type = reminder?.type || '';
	$: autoRenew = String(reminder?.autoRenewal) || '';
	$: frequency = reminder?.frequency || '';

	$: categoryName = reminder?.category?.name || '';
	$: categoryId = categories?.[0]?.category.id || '';

	const previousPage = $navigating?.from ? $navigating.from.url.pathname : '/';
	const previousCategory = previousPage.substring(
		previousPage.indexOf('category') + 9
	);
</script>

<Header title={$page.data.title} />

<div class="body">
	<form method="POST" action={$page.data.action} use:enhance>
		<div class="category">
			<label for="category">Category<i aria-hidden="true">*</i></label>
			<input
				type="text"
				name="category"
				id="category"
				placeholder="Type to select or create a new category"
				value={categoryName}
				on:input={(e) => {
					categoryName = e.currentTarget.value;
					if (categoryName.length > 1) {
						showCategories = true;
					} else {
						showCategories = false;
					}
				}}
				autocomplete="off"
				aria-haspopup="listbox"
				required />

			<input type="hidden" bind:value={categoryId} name="categoryId" />

			{#if categories}
				<ul class:show={showCategories} aria-labelledby="category">
					{#each categories as category}
						<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
						<li
							id={category.category.id}
							on:click={() => {
								categoryName = category.category.name;
								showCategories = false;
							}}>
							<svg class="table-icon" fill="var(--cream-dark)"
								><use xlink:href="#{category.category.iconId}" /></svg
							>{category.category.name}
						</li>
					{/each}

					{#if categories.length === 0}
						<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
						<li
							on:click={() => {
								showCategories = false;
							}}>
							Category not found. It will be created when you submit the form.
						</li>
					{/if}
				</ul>
			{/if}
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
					checked={type === 'ONGOING'}
					on:change={() => (type = 'ONGOING')}
					required />
				<label for="ongoing">Ongoing subscription</label>
			</div>
			<div class="option option-last">
				<input
					type="radio"
					name="type"
					id="single"
					value="SINGLE"
					checked={type === 'SINGLE'}
					on:change={() => (type = 'SINGLE')}
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
							checked={frequency === 'ANNUAL'}
							on:change={() => (frequency = 'ANNUAL')} />
						<label for="annual">Annual</label>
					</div>
					<div class="option option-last">
						<input
							type="radio"
							name="frequency"
							id="monthly"
							value="MONTHLY"
							required
							checked={frequency === 'MONTHLY'}
							on:change={() => (frequency = 'MONTHLY')} />
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
							checked={autoRenew === 'true'}
							on:change={() => (autoRenew = 'true')} />
						<label for="yes">Yes</label>
					</div>
					<div class="option option-last">
						<input
							type="radio"
							name="autoRenew"
							id="no"
							value="false"
							checked={autoRenew === 'false'}
							on:change={() => (autoRenew = 'false')} />
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

		<slot />

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

	ul {
		border-radius: 6px;
		border: 1px solid var(--greyed-out);
		background: var(--cream-light);
		display: none;
	}

	ul.show {
		display: block;
	}

	li {
		padding: 0.5rem 1rem;
	}

	li:hover {
		background: var(--cream);
		cursor: pointer;
	}

	li:hover svg {
		fill: var(--remindwise-grey);
	}

	.category input {
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
</style>
