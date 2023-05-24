<script lang="ts">
	import {
		getContextClient,
		gql,
		queryStore,
		mutationStore,
	} from '@urql/svelte';

	const categories = queryStore({
		client: getContextClient(),
		query: gql`
			query {
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

	let showForm = false;
	const updateCategories = (event) => {
		const category = event.target.category.value;
		mutationStore({
			client,
			query: gql`
            mutation {
                insertIntocategoriesCollection(
                    objects: [
                    {name: "${category}", isLocked:false, iconId:"lols"}
                    ]
                ) {
                    affectedCount
                    records {
                    id
                    name
                    }
                }
            }
        `,
		});
		showForm = false;
	};
</script>

<nav>
	<div class="profile">
		<h2>Gareth Clubb</h2>
		<p>someemail@domain.com</p>
	</div>

	<ul>
		<li><a href="/">Home</a></li>
		<li>Search</li>
		<li>Help</li>
		<li>Settings</li>
	</ul>
	<ul>
		{#if $categories.fetching}
			<li>Loading...</li>
		{:else if $categories.error}
			<li>{$categories.error.message}</li>
		{:else}
			{#each $categories.data.categories.list as category}
				<li>
					<a href="/category/{category.category.name}"
						>{category.category.name}</a
					>
				</li>
			{/each}
		{/if}
		{#if showForm}
			<li>
				<form on:submit="{updateCategories}">
					<input type="text" name="category" required />
					<button type="submit">Add</button>
				</form>
			</li>
		{/if}
		<li>
			<button on:click="{() => (showForm = true)}">Add category</button>
		</li>
	</ul>
</nav>

<style>
	nav {
		background-color: #e5e4e2;
		font-size: 1.6rem;
		grid-area: navigation;
	}
	li {
		text-transform: capitalize;
	}
</style>
