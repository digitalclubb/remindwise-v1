<script>
	import { page } from '$app/stores';
	import { getContextClient, gql, queryStore } from '@urql/svelte';

	const client = getContextClient();

	$: category = $page.params.slug;

	// TODO: Can we query reminders based on the response of the category Id
	// https://stackoverflow.com/questions/47240085/pass-obtained-field-to-another-nested-query-in-graphql
	$: categoryId = queryStore({
		client,
		query: gql`
			query ($category: String!) {
				categories: categoriesCollection(filter: { name: { eq: $category } }) {
					list: edges {
						category: node {
							id
						}
					}
				}
			}
		`,
		variables: {
			category,
		},
	});

	// TODO: unpause this once we have the Id back?
	$: reminders = queryStore({
		client,
		query: gql`
			query ($categoryId: String!) {
				reminders: remindersCollection(
					filter: { categoryId: { eq: $category } }
				) {
					list: edges {
						reminder: node {
							company
							cost
							dateOfRenewal
							autoRenewal
							reminderTypes
						}
					}
				}
			}
		`,
		variables: {
			categoryId,
		},
		//pause: true,
	});
</script>

<h1>{category}</h1>

<p>
	id:

	{#if $categoryId.fetching}
		Loading...
	{:else if $categoryId.error}
		{$categoryId.error.message}
	{:else}
		{$categoryId.data.categories.list[0].category.id}
	{/if}
</p>

<p>
	reminders:

	{#if $reminders.fetching}
		Loading...
	{:else if $reminders.error}
		{$reminders.error.message}
	{:else}
		{#each $reminders.data.reminders.list as reminder}
			{reminder.reminder.company}
		{/each}
	{/if}
</p>
