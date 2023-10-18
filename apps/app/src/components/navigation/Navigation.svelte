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

	$: selected = $page.url.pathname.includes('category')
		? $page.url.pathname.split('/')[2]
		: '';

	const signOut = async () => {
		await $page.data.supabase.auth.signOut();
		await goto('/login');
	};
</script>

<nav>
	<figure>
		<img
			src="/static/logo.svg"
			alt="remindwise.io logo"
			width="170"
			height="27"
		/>
	</figure>

	<div class="profile">
		{#if $getSettingsStore.fetching}
			<li>Loading...</li>
		{:else if $getSettingsStore.errors}
			<li>{$getSettingsStore.errors}</li>
		{:else if settings}
			<h3>
				<svg fill="var(--cream)"><use xlink:href="#user" /></svg
				>{settings.first_name + ' ' + settings.last_name}
			</h3>
		{/if}

		<Button
			><svg fill="var(--cream)"><use xlink:href="#plus" /></svg>Add a new
			reminder</Button
		>
	</div>
	<ul class="categories">
		<li class:selected={selected === ''}>
			<a href="/"
				><svg fill="var(--cream)"><use xlink:href="#bar-graph" /></svg> Dashboard</a
			>
		</li>
		{#if $categoriesStore.fetching}
			<li>Loading...</li>
		{:else if $categoriesStore.errors}
			<li>{$categoriesStore.errors}</li>
		{:else if categories}
			{#each categories as category}
				<li class:selected={selected === category.category.name}>
					<a href="/category/{category.category.name}"
						><svg fill="var(--cream)"
							><use xlink:href="#{category.category.iconId}" /></svg
						>
						<span
							>{category.category.name}
							{#if category.category.reminders}
								<span class="count"
									>({category.category.reminders.totalCount})</span
								>
							{/if}
						</span>
					</a>
					<!-- TODO how to handle this? Needs to be a button? Will it be positioned absolute? Not sure if accessibility is great -->
					<svg class="options" fill="var(--cream)"
						><use xlink:href="#dots-three-horizontal" /></svg
					>
				</li>
			{/each}
		{/if}
		<li class="add-category">
			<svg fill="var(--cream)"><use xlink:href="#plus" /></svg>
			<Button style="tertiary" onClick={() => (showModal = true)}
				>Add category</Button
			>
		</li>
	</ul>
	<ul class="settings">
		<li><a href="/help"><svg><use xlink:href="#help" /></svg> Help</a></li>
		<li>
			<a href="/settings"><svg><use xlink:href="#cog" /></svg> Settings</a>
		</li>
		<li>
			<a href="/" on:click={signOut}
				><svg><use xlink:href="#log-out" /></svg> Logout</a
			>
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
		background-color: var(--remindwise-grey);
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		font-size: 1.4rem;
		grid-area: navigation;
	}

	figure {
		align-self: center;
		padding: 2.5rem 4rem;
	}

	.profile {
		align-items: center;
		background-color: var(--grey);
		display: flex;
		flex-direction: column;
		gap: 2.2rem;
		padding: 2.5rem 3.6rem 6.5rem 3.6rem;
	}

	.profile h3 {
		align-items: center;
		color: var(--orange);
		display: flex;
		font-size: 1.4rem;
		gap: 1rem;
	}
	.profile h3 svg {
		height: 1.4rem;
		width: 1.4rem;
	}

	.categories {
		flex-grow: 2;
	}

	li {
		color: var(--cream);
		font-weight: 500;
		text-transform: capitalize;
		display: flex;
		align-items: center;
		padding-right: 1.7rem;
	}

	li:hover {
		cursor: pointer;
	}

	li .options {
		display: none;
	}

	li:hover .options {
		display: block;
	}

	.count {
		font-weight: 300;
	}

	a {
		color: var(--cream);
		text-decoration: none;
		display: flex;
		align-items: center;
		gap: 1.2rem;
		flex-grow: 2;
		padding: 1rem 0 1rem 4rem;
	}

	a:hover {
		color: var(--orange);
	}

	.selected {
		background-color: var(--grey-dark);
	}

	.selected svg {
		fill: var(--orange);
	}

	svg {
		height: 1.8rem;
		width: 1.8rem;
		vertical-align: middle;
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
		cursor: pointer;
		display: inline-block;
		padding: 5px;
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

	.add-category {
		display: flex;
		align-items: center;
		gap: 1.2rem;
		margin-top: 1rem;
		justify-content: flex-start;
		padding: 1rem 0 1rem 4rem;
	}

	.settings {
		margin-bottom: 2.6rem;
	}

	.settings svg {
		fill: var(--cream);
	}
</style>
