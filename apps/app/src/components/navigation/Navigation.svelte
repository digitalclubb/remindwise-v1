<script lang="ts">
	import Modal from '../modal/Modal.svelte';
	import { icons } from '../icons/icons';

	import { Button } from 'components';

	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { refresh } from '../../stores';

	import { getSettingsStore as Y, graphql, getCategoriesStore } from '$houdini';
	export let categoriesStore: getCategoriesStore;
	export let getSettingsStore: Y;
	$: categories = $categoriesStore.data?.categories?.list;
	$: settings = $getSettingsStore.data?.settings?.list[0].setting;

	refresh.subscribe(async (value) => {
		if (value) {
			await categoriesStore.fetch({ policy: 'NetworkOnly' });
			refresh.set(false);
		}
	});

	let showModal = false;

	const addCategoryMutation = graphql(`
		mutation addCategory(
			$category: String!
			$isLocked: Boolean!
			$iconId: String!
			$userId: UUID
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
					isLocked
					iconId
					userid
				}
			}
		}
	`);

	const onAddCategory = async (event: SubmitEvent) => {
		const formData = new FormData(event.target as HTMLFormElement);

		await addCategoryMutation.mutate({
			category: formData.get('category')?.toString().toLowerCase() || '',
			isLocked: false,
			iconId: formData.get('icon')?.toString() || '',
			userId: $page.data.session?.user.id,
		});
		showModal = false;
		//TODO is this the best way to do it?
		refresh.update((n) => !n);
	};

	const signOut = async () => {
		await $page.data.supabase.auth.signOut();
		await goto('/login');
	};
</script>

<nav>
	<h2>remindwise.io</h2>
	<div class="profile">
		{#if $getSettingsStore.fetching}
			<li>Loading...</li>
		{:else if $getSettingsStore.errors}
			<li>{$getSettingsStore.errors}</li>
		{:else if settings}
			<h3>
				{settings.first_name + ' ' + settings.last_name}
			</h3>
			<p>{settings.email}</p>
		{/if}
	</div>
	<ul class="categories">
		<li>
			<a href="/" class="selected"
				><svg><use xlink:href="#bar-graph" /></svg> Dashboard</a
			>
		</li>
		{#if $categoriesStore.fetching}
			<li>Loading...</li>
		{:else if $categoriesStore.errors}
			<li>{$categoriesStore.errors}</li>
		{:else if categories}
			{#each categories as category}
				<li>
					<a href="/category/{category.category.name}"
						><svg><use xlink:href="#{category.category.iconId}" /></svg>
						{category.category.name}</a
					>
				</li>
			{/each}
		{/if}
		<li class="add">
			<Button on:click={() => (showModal = true)}>Add category</Button>
		</li>
		<li>
			<a class="button" href="/reminder/add">Add reminder</a>
		</li>
	</ul>
	<ul class="settings">
		<li><a href="/help"><svg><use xlink:href="#help" /></svg> Help</a></li>
		<li>
			<a href="/settings"><svg><use xlink:href="#cog" /></svg> Settings</a>
		</li>
		<li>
			<svg><use xlink:href="#log-out" /></svg>
			<Button on:click={signOut} style="secondary">Log out</Button>
		</li>
	</ul>
	<Modal bind:showModal>
		<h2>Add a category for your reminders</h2>
		<form on:submit|preventDefault={onAddCategory}>
			<label for="category">Category name</label>
			<input type="text" name="category" id="category" required />

			<h3>Pick an icon</h3>
			<div class="icons">
				{#each icons as icon}
					<input type="radio" name="icon" value={icon} id="{icon}-icon" />
					<label for="{icon}-icon"
						><svg><use xlink:href="#{icon}" /></svg></label
					>
				{/each}
			</div>
			<Button type="submit">Add</Button>
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

	.add {
		margin-top: 10rem;
		margin-bottom: 1.6rem;
	}

	.button {
		display: inline-block;
		outline: none;
		cursor: pointer;
		border-style: solid;
		border-width: 0.1rem;
		border-radius: 0.3rem;
		padding: 1.2rem 2.4rem;
		line-height: 1.15;
		font-size: 1.6rem;
		color: #000000;
		background-color: #ffffff;
		border-color: #373c61;
		text-align: center;
	}
	.button:hover {
		transition: all 0.1s ease;
		border-color: #9a0202;
	}
</style>
