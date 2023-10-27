<script lang="ts">
	import { page, navigating } from '$app/stores';
	import { enhance } from '$app/forms';
	import Header from '../../../../components/header/Header.svelte';

	export let data;
	let option = '';

	$: ({ getCategories } = data);

	$: categories = $getCategories.data?.categories?.list;

	const previousPage = $navigating?.from ? $navigating.from.url.pathname : '/';
	const previousCategory = previousPage.substring(
		previousPage.indexOf('category') + 9
	);
</script>

<Header title="Add a reminder" />

<div class="body">
	<form method="POST" action="?/addReminder" use:enhance>
		<input
			type="hidden"
			name="userId"
			id="userId"
			value={$page.data.session?.user.id}
		/>
		<div>
			<label for="category-select">Category</label>
			<select name="category-select" id="category-select" required>
				{#if $getCategories.fetching}
					<option value="">Loading...</option>
				{:else if categories}
					{#each categories as category}
						<option
							value={category.category.id}
							selected={previousCategory === category.category.name}
							>{category.category.name}</option
						>
					{/each}
				{/if}
			</select>
		</div>

		<div>
			<label for="name">Reminder name</label>
			<input
				type="text"
				name="name"
				id="name"
				placeholder="Enter a name for your reminder"
				required
			/>
		</div>

		<fieldset class="options">
			<legend>What type of reminder is this?</legend>
			<div class="option option-first">
				<input
					type="radio"
					name="type"
					id="ongoing"
					value="ongoing"
					bind:group={option}
				/>
				<label for="ongoing">Ongoing subscription</label>
			</div>
			<div class="option">
				<input
					type="radio"
					name="type"
					id="annual"
					value="annual"
					bind:group={option}
				/>
				<label for="annual">Annual policy</label>
			</div>
			<div class="option option-last">
				<input
					type="radio"
					name="type"
					id="single"
					value="single"
					bind:group={option}
				/>
				<label for="single">Single record</label>
			</div>
		</fieldset>

		<div>
			<label for="company">Company</label>
			<input
				type="text"
				name="company"
				id="company"
				placeholder="Enter the name of the company"
				required
			/>
		</div>

		<div class="cost">
			<div>
				<label for="cost">
					{#if option === 'single'}
						What is the total?
					{:else}
						What is the re-occuring cost?
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
					/>
				</div>
			</div>

			<div>
				<label for="renewal">Date</label>
				<input type="date" name="renewal" id="renewal" />
			</div>
		</div>

		<div>
			<label for="notes">Notes</label>
			<textarea
				name="notes"
				placeholder="Enter things like policy number, quick contact details for the company etc."
			/>
		</div>

		<div class="submit">
			<!-- Add on /add, Save on /edit-->
			<svelte:component this={$page.data.submit} />
		</div>
	</form>
</div>

<style>
	.body {
		padding: 2.4rem 4.2rem;
	}

	form {
		max-width: 64rem;
	}

	select {
		display: block;
		width: 100%;
	}

	label {
		display: inline-block;
		margin-top: 2rem;
		margin-bottom: 0.8rem;
	}

	input {
		display: block;
		border: 1px solid var(--grey-light);
		border-radius: 0.6rem;
		padding: 0.9rem 1.4rem;
		width: 28.5rem;
	}

	fieldset {
		all: unset;
		margin-top: 2rem;
	}

	.options {
		display: flex;
	}

	.option input {
		position: absolute;
		visibility: hidden;
	}

	.option label {
		background-color: var(--cream-light);
		border-top: 1px solid var(--cream);
		border-bottom: 1px solid var(--cream);
		padding-top: 1.1rem;
		padding-bottom: 1.1rem;
		width: 20rem;
		text-align: center;
	}

	.option-first label {
		border-top-left-radius: 2rem;
		border-bottom-left-radius: 2rem;
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

	.cost {
		display: flex;
		flex-wrap: wrap;
		gap: 4rem;
	}

	.currency input {
		display: inline;
	}

	.currency span {
		color: var(--cream-dark);
		font-size: 2.4rem;
	}

	textarea {
		display: block;
		border: 1px solid var(--grey-light);
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
