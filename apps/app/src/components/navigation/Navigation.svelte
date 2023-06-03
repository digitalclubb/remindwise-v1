<script lang="ts">
	import {
		getContextClient,
		gql,
		queryStore,
		mutationStore,
	} from '@urql/svelte';

	import Modal from '../modal/Modal.svelte';
	import { icons } from '../icons/icons';

	const client = getContextClient();

	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

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
		const category = event.target.category.value.toLowerCase();
		const iconId = event.target.icon.value;
		const isLocked = false;
		mutationStore({
			client,
			query: gql`
				mutation (
					$category: String!
					$isLocked: Bool!
					$iconId: String!
					$userId: uuid!
				) {
					insertIntocategoriesCollection(
						objects: [
							{
								name: $category
								isLocked: $isLocked
								iconId: $iconId
								userid: $userId
							}
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
			variables: {
				category,
				isLocked,
				iconId,
				userId: $page.data.session?.user.id,
			},
		});
		showModal = false;
	};

	const signOut = async () => {
		await $page.data.supabase.auth.signOut();
		await goto('/login');
	};
</script>

<nav>
	<h2>remindwise.io</h2>
	<div class="profile">
		<h3>Gareth Clubb</h3>
		<p>someemail@domain.com</p>
	</div>
	<ul class="categories">
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
						><svg><use xlink:href="#{category.category.iconId}"></use></svg>
						{category.category.name}</a
					>
				</li>
			{/each}
		{/if}
		<li>
			<button on:click="{() => (showModal = true)}">Add category</button>
		</li>
	</ul>
	<ul class="settings">
		<li><svg><use xlink:href="#help"></use></svg> Help</li>
		<li><svg><use xlink:href="#cog"></use></svg> Settings</li>
		<li>
			<svg><use xlink:href="#log-out"></use></svg>
			<button on:click="{signOut}">Log out</button>
		</li>
	</ul>
	<Modal bind:showModal="{showModal}">
		<h2>Add a category for your reminders</h2>
		<form on:submit="{updateCategories}">
			<label for="category">Category name</label>
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
			<button autofocus on:click="{() => dialog.close()}">asd</button>
			<button type="submit">Add</button>
		</form>
	</Modal>
</nav>

<style>
	nav {
		background-color: #f8fafb;
		font-size: 1.6rem;
		grid-area: navigation;
		padding: 1.8rem 2.6rem;
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
	}

	.profile {
		margin-bottom: 2.6rem;
	}

	.profile h3 {
		margin-bottom: 0;
	}

	.categories {
		flex-grow: 1;
	}

	li {
		text-transform: capitalize;
		font-size: 1.6rem;
		font-weight: bold;
		margin-top: 1.2rem;
	}

	a {
		color: #6a6c70;
		text-decoration: none;
	}

	.selected {
		color: #2f3034;
	}

	svg {
		width: 1.8rem;
		height: 1.8rem;
		vertical-align: middle;
		margin-right: 0.6rem;
	}

	.icons {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		height: 20%;
		overflow-y: auto;
	}

	.icons label {
		border: solid 2px #6a6c7026;
		border-radius: 0.3rem;
		display: inline-block;
		padding: 5px;
		cursor: pointer;
	}

	.icons label:hover {
		border-color: #ffbb00;
	}

	.icons svg {
		margin-right: 0;
	}

	input[type='radio'] {
		display: none;
	}

	input[type='radio']:active + label,
	input[type='radio']:checked + label {
		border-color: #ffbb00;
	}
</style>
