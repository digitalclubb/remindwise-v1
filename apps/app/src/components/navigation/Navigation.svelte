<script lang="ts">
	import {
		getContextClient,
		gql,
		queryStore,
		mutationStore,
	} from '@urql/svelte';

	import Sprite from '../icons/Sprite.svelte';
	import Modal from '../modal/Modal.svelte';
	import { icons } from '../icons/icons';

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

	let showModal = false;
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
		showModal = false;
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
		<li>
			<button on:click="{() => (showModal = true)}">Add category</button>
		</li>
	</ul>
	<ul>
		<li><svg><use xlink:href="#help"></use></svg> Help</li>
		<li><svg><use xlink:href="#cog"></use></svg> Settings</li>
		<li><svg><use xlink:href="#log-out"></use></svg> Log out</li>
	</ul>
</nav>

<Modal bind:showModal="{showModal}">
	<h2>Add a category!</h2>
	<form on:submit="{updateCategories}">
		<label for="category">Add a name</label>
		<input type="text" name="category" id="category" required />

		<h3>Pick an icon</h3>
		<div class="icons">
			{#each icons as icon}
				<input type="radio" name="icon" value="{icon}" id="{icon}-icon" />
				<label for="{icon}-icon"
					><svg><use xlink:href="#{icon}"></use></svg></label
				>
			{/each}
		</div>

		<button type="submit">Add</button>
	</form>
</Modal>

<svelte:component this="{Sprite}" />

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

	.icons {
		height: 200px;
		overflow-y: auto;
	}

	.icons label {
		border: solid 1px #6a6c7026;
		display: inline-block;
		padding: 5px;
	}

	input[type='radio'] {
		opacity: 0;
		width: 0;
		height: 0;
	}

	input[type='radio']:active + label {
		opacity: 1;
	}

	input[type='radio']:checked + label {
		opacity: 1;
		border: 1px solid red;
	}
</style>
