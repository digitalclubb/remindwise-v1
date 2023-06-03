<script>
	import { page } from '$app/stores';
	import { getContextClient, gql, queryStore } from '@urql/svelte';

	const client = getContextClient();

	$: category = $page.params.slug;

	// TODO: Can we query reminders based on the response of the category Id
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
