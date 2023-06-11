<script lang="ts">
	import {
		getContextClient,
		gql,
		queryStore,
		mutationStore,
	} from '@urql/svelte';
	import { page } from '$app/stores';
	import { Button } from 'components';

	const client = getContextClient();

	const categories = queryStore({
		client,
		query: gql`
			query getCategories {
				categories: categoriesCollection {
					list: edges {
						category: node {
							id
							name
							iconId
						}
					}
				}
			}
		`,
	});

	const addReminder = (event) => {
		mutationStore({
			client,
			query: gql`
				mutation (
					$categoryId: Int!
					$company: String!
					$cost: Float
					$dateOfRenewal: Date
					$autoRenewal: Boolean
					$notes: String
					$userid: UUID!
					$enabled: Boolean
				) {
					insertIntoremindersCollection(
						objects: [
							{
								company: $company
								cost: $cost
								dateOfRenewal: $dateOfRenewal
								categoryId: $categoryId
								autoRenewal: $autoRenewal
								userid: $userid
								notes: $notes
								enabled: $enabled
							}
						]
					) {
						affectedCount
						records {
							id
							company
						}
					}
				}
			`,
			variables: {
				categoryId: event.target.category.value,
				company: event.target.company.value,
				// cost: event.target.cost.value,
				// dateOfRenewal: event.target.renewal.value,
				// autoRenewal: event.target.auto.value,
				// notes: event.target.notes.value,
				userid: $page.data.session?.user.id,
				enabled: true,
			},
		});
	};
</script>

<h1>Add a reminder</h1>

<form on:submit="{addReminder}">
	<div>
		<label for="category">Which category?</label>
		<select id="category" required>
			{#if $categories.fetching}
				<option value="">Loading...</option>
			{:else}
				<option value=""></option>
				{#each $categories.data.categories.list as category}
					<option value="{category.category.id}"
						>{category.category.name}</option
					>
				{/each}
			{/if}
		</select>
		<Button style="secondary">Add new category</Button>
	</div>

	<div>
		<label for="company">What is the company?</label>
		<input type="text" id="company" required />
	</div>
	<div>
		<label for="cost">How much did it cost?</label>
		<input type="number" min="0" step="any" id="cost" />
	</div>
	<div>
		<div>
			<label for="renewal">When is it due for renewal?</label>
			<input type="date" id="renewal" />
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
		<textarea id="notes" name="notes"></textarea>
	</div>

	<slot />
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
