<script lang="ts">
	import {
		getContextClient,
		gql,
		queryStore,
		mutationStore,
	} from '@urql/svelte';
	import Sprite from '../icons/Sprite.svelte';

	const client = getContextClient();

	const categories = queryStore({
		client,
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
		const isLocked = false;
		const iconId = '123';
		mutationStore({
			client,
			query: gql`
				mutation ($category: String!, $isLocked: Bool!, $iconId: String!) {
					insertIntocategoriesCollection(
						objects: [{ name: $category, isLocked: $isLocked, iconId: $iconId }]
					) {
						affectedCount
						records {
							id
							name
						}
					}
				}
			`,
			variables: { category, isLocked, iconId },
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
		<li>
			<a href="/" class="selected"
				><svg><use xlink:href="#bar-graph"></use></svg> Dashboard</a
			>
		</li>
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
	<ul>
		<li><svg><use xlink:href="#help"></use></svg> Help</li>
		<li><svg><use xlink:href="#cog"></use></svg> Settings</li>
		<li><svg><use xlink:href="#log-out"></use></svg> Log out</li>
	</ul>
	<svelte:component this="{Sprite}" />
</nav>

<style>
	nav {
		background-color: #f8fafb;
		font-size: 1.6rem;
		grid-area: navigation;
	}
	li {
		text-transform: capitalize;
	}

	a {
		color: #6a6c70;
	}

	.selected a {
		color: #2f3034;
	}

	svg {
		width: 15px;
		height: 15px;
	}
</style>
