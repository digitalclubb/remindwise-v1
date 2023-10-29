<script lang="ts">
	import Modal from '../modal/Modal.svelte';
	import { icons } from '../icons/icons';

	import { Button } from 'components';

	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { refresh } from '../../stores';

	import { getSettingsStore, graphql, getCategoriesStore } from '$houdini';
	import { fly } from 'svelte/transition';
	import { browser } from '$app/environment';
	import Link from 'components/link/Link.svelte';
	export let categoriesStore: getCategoriesStore;
	export let settingsStore: getSettingsStore;
	$: categories = $categoriesStore.data?.categories?.list;
	$: settings = $settingsStore.data?.settings?.list[0].setting;

	refresh.subscribe(async (value) => {
		if (value) {
			await categoriesStore.fetch({ policy: 'NetworkOnly' });
			refresh.set(false);
		}
	});

	let showModal = false;
	let hideNavigation = true;
	$: width = 767;
	$: if (browser) {
		width = window.innerWidth;
	}

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

	$: selected, (clicked = -1);

	const signOut = async () => {
		await $page.data.supabase.auth.signOut();
		await goto('/login');
	};

	const onClickOptions = (index: number) => {
		if (clicked === index) {
			clicked = -1;
		} else {
			clicked = index;
		}
	};

	$: clicked = -1;
</script>

<nav>
	<figure>
		<img src="/logo.svg" alt="remindwise.io logo" width="170" height="27" />
		<button on:click={() => (hideNavigation = false)}
			><svg fill="var(--orange)"><use xlink:href="#menu" /></svg></button
		>
	</figure>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="overlay"
		on:click={() => {
			hideNavigation = true;
		}}
		hidden={hideNavigation}
	></div>

	{#if !hideNavigation || width >= 768}
		<div
			class="content"
			class:hidden={hideNavigation && width < 768}
			transition:fly={{ y: 100, duration: 500 }}
		>
			<div class="profile">
				{#if $settingsStore.fetching}
					<li>Loading...</li>
				{:else if $settingsStore.errors}
					<li>{$settingsStore.errors}</li>
				{:else if settings}
					<h3>
						<svg fill="var(--cream)"><use xlink:href="#user" /></svg
						>{settings.first_name + ' ' + settings.last_name}
					</h3>
				{/if}

				<Link type="button" href="/reminder/add"
					><svg fill="var(--white)"><use xlink:href="#plus" /></svg>Add a new
					reminder</Link
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
					{#each categories as category, index}
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
							<button
								class="icon-button"
								class:active={clicked === index}
								on:click={() => onClickOptions(index)}
								><svg fill="var(--cream)"
									><use xlink:href="#dots-three-horizontal" /></svg
								></button
							>
							<!-- TODO sort out a11y, rename & delete trigger modals. Create modals here? Can I use form actions? -->
							<ul class="options" class:active={clicked === index}>
								<li>Rename<svg><use xlink:href="#pencil" /></svg></li>
								<li>Delete<svg><use xlink:href="#trash" /></svg></li>
							</ul>
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
		</div>
	{/if}

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
		font-size: 1.4rem;
		grid-area: navigation;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.overlay {
		background: rgba(51, 58, 66, 0.3);
		position: absolute;
		height: 100%;
		width: 100%;
		z-index: 1;
	}

	.content {
		display: flex;
		margin-top: 8.8rem;
		position: absolute;
		background-color: var(--remindwise-grey);
		width: 100%;
		z-index: 2;
		border-top-left-radius: 12px;
		border-top-right-radius: 12px;
		overflow-x: hidden;
		overflow-y: scroll;
		height: calc(100% - 8.8rem);
		flex-direction: column;
	}

	.hidden {
		display: none;
	}

	figure {
		align-self: flex-start;
		padding: 2.2rem 2.1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}

	figure svg {
		height: 3rem;
		width: 3rem;
		align-self: flex-end;
	}

	button {
		cursor: pointer;
		background: none;
		border: none;
		padding: 0;
	}

	.profile {
		align-items: flex-start;
		background-color: var(--grey);
		display: flex;
		flex-direction: column;
		gap: 1.3rem;
		padding: 2.5rem 3.4rem 2.8rem 3.4rem;
	}

	.profile h3 {
		align-items: center;
		color: var(--orange);
		display: flex;
		font-size: 1.4rem;
		gap: 1rem;
		margin: 0;
	}
	.profile h3 svg {
		margin-left: 1rem;
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
		position: relative;
	}

	li:hover {
		cursor: pointer;
	}

	li .icon-button {
		display: none;
	}

	li:hover .icon-button {
		display: flex;
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
		padding: 1rem 0 1rem 3.4rem;
	}

	a:hover {
		color: var(--orange);
	}

	.selected {
		background-color: var(--grey-dark);
	}

	.selected a svg {
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

	.icon-button {
		background: none;
		border: none;
		padding-left: 0.6rem;
		padding-right: 0.6rem;
	}

	.icon-button:hover {
		cursor: pointer;
	}

	.icon-button.active {
		display: flex;
		background: var(--orange);
		border-top-left-radius: 3px;
		border-top-right-radius: 3px;
	}

	.options {
		display: none;
	}

	.options.active {
		display: flex;
		position: absolute;
		background: var(--orange);
		color: var(--cream);
		border-radius: 3px 0 3px 3px;
		padding: 1.5rem;
		gap: 2rem;
		flex-direction: column;
		width: 12.3rem;
		top: 2.9rem;
		z-index: 1;
		right: 1.7rem;
	}

	.options.active li {
		display: flex;
		justify-content: space-between;
		padding: 0;
	}

	.options svg {
		fill: var(--cream);
	}

	@media screen and (min-width: 768px) {
		.content {
			position: relative;
			margin-top: 0;
			border-radius: 0;
			overflow: hidden;
		}

		figure {
			align-self: center;
			padding: 2.5rem 4rem;
			width: inherit;
		}

		figure svg {
			display: none;
		}

		.profile {
			background-color: var(--grey-light);
			padding: 2.5rem 3.6rem 6.5rem 3.6rem;
			align-items: center;
			gap: 2.2rem;
		}

		.profile h3 svg {
			margin-left: 0;
		}

		a {
			padding: 1rem 0 1rem 4rem;
		}
	}
</style>
