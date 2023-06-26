<script lang="ts">
	import {
		getContextClient,
		gql,
		queryStore,
		mutationStore,
	} from '@urql/svelte';
	import { page, navigating } from '$app/stores';
	import { goto } from '$app/navigation';
	import { Button } from 'components';

	import getCategories from '@graphql/queries/getCategories.graphql';
	import addReminder from '@graphql/mutations/addReminder.graphql';

	const client = getContextClient();

	const previousPage = $navigating?.from ? $navigating.from.url.pathname : '/';
	const previousCategory = previousPage.substring(
		previousPage.indexOf('category') + 9
	);

	const categories = queryStore({
		client,
		query: gql`
			${getCategories}
		`,
	});

	const createReminder = (event: SubmitEvent) => {
		const formData = new FormData(event.target as HTMLFormElement);
		const cost = formData.get('cost');

		mutationStore({
			client,
			query: gql`
				${addReminder}
			`,
			variables: {
				categoryId: formData.get('category'),
				company: formData.get('company'),
				cost: cost ? parseFloat(cost.toString()) : undefined,
				dateOfRenewal: formData.get('renewal'),
				autoRenewal: formData.get('auto') === 'true',
				notes: formData.get('notes'),
				userid: $page.data.session?.user.id,
				enabled: true,
			},
		}).subscribe((result) => {
			if (result.error) {
				// Error
				console.log('Error', result);
			}

			if (result.data) {
				// Success
				goto(previousPage);
			}
		});
	};
</script>

<h1>Add a reminder</h1>

<form on:submit={createReminder}>
	<div>
		<label for="category-select">Which category?</label>
		<select name="category-select" id="category-select" required>
			{#if $categories.fetching}
				<option value="">Loading...</option>
			{:else}
				{#each $categories.data.categories.list as category}
					<option
						value={category.category.id}
						selected={previousCategory === category.category.name}
						>{category.category.name}</option
					>
				{/each}
			{/if}
		</select>

		<p>Want to add a new category?</p>
		<Button style="secondary">Add new category</Button>
	</div>

	<div>
		<label for="company">What is the company?</label>
		<input type="text" name="company" id="company" required />
	</div>
	<div>
		<label for="cost">How much did it cost?</label>
		<input type="number" min="0" step="any" name="cost" id="cost" />
	</div>
	<div>
		<div>
			<label for="renewal">When is it due for renewal?</label>
			<input type="date" name="renewal" id="renewal" />
		</div>
		<fieldset>
			<legend>Will it auto renew?</legend>
			<div class="toggle">
				<input type="radio" id="auto-yes" value="true" name="auto" />
				<label for="auto-yes">Yes</label>
				<input type="radio" id="auto-no" value="false" name="auto" checked />
				<label for="auto-no">No</label>
			</div>
		</fieldset>
	</div>

	<div>
		<label for="notes">Any thing else to remember?</label>
		<textarea name="notes" />
	</div>

	<!-- Add on /add, Save on /edit-->
	<svelte:component this={$page.data.submit} />
</form>

<style>
	form {
		width: 40%;
	}
	div,
	fieldset {
		margin-bottom: 1.8rem;
	}

	fieldset {
		padding: 0;
		margin-left: 0;
		margin-right: 0;
		border: none;
	}

	label,
	legend {
		font-size: 1.8rem;
		margin-bottom: 0.5rem;
		width: 100%;
		display: block;
		user-select: none;
		font-weight: bold;
	}

	select,
	input[type='text'],
	input[type='number'],
	input[type='date'] {
		height: 5rem;
		border-radius: 0.5rem;
		border: 1px solid #ced6e0;
		transition: all 0.3s ease-in-out;
		font-size: 1.6rem;
		padding: 0.5rem 1.5rem;
		width: 100%;
	}

	select {
		display: block;
		margin-bottom: 1.6rem;
	}

	p {
		font-size: 1.4rem;
		display: inline-block;
		margin-right: 1.2rem;
	}

	.toggle {
		display: flex;
		overflow: hidden;
	}

	.toggle input {
		position: absolute !important;
		clip: rect(0, 0, 0, 0);
		height: 1px;
		width: 1px;
		border: 0;
		overflow: hidden;
	}

	.toggle label {
		background-color: #f3f1f1;
		color: rgba(0, 0, 0, 0.6);
		font-size: 14px;
		line-height: 1;
		text-align: center;
		padding: 8px 16px;
		margin-right: -1px;
		border: 1px solid rgba(0, 0, 0, 0.2);
		box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.3),
			0 1px rgba(255, 255, 255, 0.1);
		transition: all 0.1s ease-in-out;
	}

	.toggle label:hover {
		cursor: pointer;
	}

	.toggle input:checked + label {
		color: #ffffff;
		background-color: #373c61;
		box-shadow: none;
	}

	.toggle label:first-of-type {
		border-radius: 4px 0 0 4px;
	}

	.toggle label:last-of-type {
		border-radius: 0 4px 4px 0;
	}

	textarea {
		font-size: 1.6rem;
		min-height: 20rem;
		width: 100%;
	}
</style>
