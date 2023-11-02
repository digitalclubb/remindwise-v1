<script lang="ts">
	import Modal from '../modal/Modal.svelte';
	import { icons } from '../icons/icons';

	import { Button } from 'components';

	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { refresh } from '../../stores';

	import {
		getSettingsStore,
		getCategoriesStore,
		addCategoryStore,
		updateCategoryStore,
		deleteCategoryStore,
	} from '$houdini';
	import Link from 'components/link/Link.svelte';
	import Input from 'components/input/Input.svelte';
	import type { Categories } from '@graphql/types';
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

	let showAddModal = false;
	let showDeleteModal = false;
	let currentCategory: Pick<Categories, 'id' | 'iconId' | 'name'> | undefined;
	let showNavigation = false;

	const onAddCategory = async (event: SubmitEvent) => {
		const addCategory = new addCategoryStore();
		const target = event.target as HTMLFormElement;
		const formData = new FormData(target);

		await addCategory.mutate({
			category: formData.get('category')?.toString().toLowerCase() || '',
			isLocked: false,
			iconId: formData.get('icon')?.toString() || '',
			userId: $page.data.session?.user.id,
		});

		showAddModal = false;
		refresh.update((n) => !n);

		target.reset();
	};

	const onEditCategory = async (event: SubmitEvent) => {
		const updateCategory = new updateCategoryStore();
		const target = event.target as HTMLFormElement;
		const formData = new FormData(target);

		await updateCategory.mutate({
			id: currentCategory?.id,
			name: formData.get('category')?.toString().toLowerCase() || '',
			iconId: formData.get('icon')?.toString() || '',
		});

		currentCategory = undefined;
		showAddModal = false;
		refresh.update((n) => !n);
		target.reset();
	};

	const onDeleteCategory = async () => {
		const deleteCategory = new deleteCategoryStore();

		await deleteCategory.mutate({ id: currentCategory?.id });

		showDeleteModal = false;
		currentCategory = undefined;
		refresh.update((n) => !n);
	};

	$: selected = $page.url.pathname.includes('category')
		? $page.url.pathname.split('/')[2]
		: '';

	$: console.log('url', $page.url.pathname);
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

	const getUsername = () => {
		if (settings?.first_name !== null)
			return settings?.first_name + ' ' + (settings?.last_name || '');
		return settings?.email;
	};

	$: clicked = -1;
</script>

<nav>
	<figure>
		<img src="/logo.svg" alt="remindwise.io logo" width="170" height="27" />
		<button on:click={() => (showNavigation = true)}
			><svg fill="var(--orange)"><use xlink:href="#menu" /></svg></button>
	</figure>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="overlay"
		on:click={() => {
			showNavigation = false;
		}}
		hidden={!showNavigation}>
	</div>

	<div class="content" class:show={showNavigation}>
		<div class="profile">
			{#if $settingsStore.fetching}
				<li>Loading...</li>
			{:else if $settingsStore.errors}
				<li>{$settingsStore.errors}</li>
			{:else if settings}
				<h3>
					<svg fill="var(--cream)"><use xlink:href="#user" /></svg
					>{getUsername()}
				</h3>
			{/if}

			<Link type="button" href="/reminder/add"
				><svg fill="var(--white)"><use xlink:href="#plus" /></svg>Add a new
				reminder</Link>
		</div>
		<ul class="categories">
			<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
			<li
				class:selected={selected === ''}
				on:click={() => (showNavigation = false)}>
				<a href="/"
					><svg fill="var(--cream)"><use xlink:href="#bar-graph" /></svg> Dashboard</a>
			</li>
			{#if $categoriesStore.fetching}
				<li>Loading...</li>
			{:else if $categoriesStore.errors}
				<li>{$categoriesStore.errors}</li>
			{:else if categories}
				{#each categories as category, index}
					<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
					<li
						class:selected={selected === category.category.name}
						on:click={() => (showNavigation = false)}>
						<a href="/category/{category.category.name}"
							><svg fill="var(--cream)"
								><use xlink:href="#{category.category.iconId}" /></svg>
							<span
								>{category.category.name}
								{#if category.category.reminders}
									<span class="count"
										>({category.category.reminders.totalCount})</span>
								{/if}
							</span>
						</a>
						<button
							class="icon-button"
							class:active={clicked === index}
							on:click={(e) => {
								e.stopPropagation();
								onClickOptions(index);
							}}
							><svg fill="var(--cream)"
								><use xlink:href="#dots-three-horizontal" /></svg
							></button>
						<ul class="options" class:active={clicked === index}>
							<li>
								<button
									on:click={(e) => {
										currentCategory = {
											id: category.category.id,
											name: category.category.name,
											iconId: category.category.iconId,
										};
										showAddModal = true;
										clicked = -1;
									}}>Rename <svg><use xlink:href="#pencil" /></svg></button>
							</li>
							<li>
								<button
									on:click={() => {
										currentCategory = {
											id: category.category.id,
											name: category.category.name,
											iconId: category.category.iconId,
										};
										showDeleteModal = true;
										clicked = -1;
									}}>Delete<svg><use xlink:href="#trash" /></svg></button>
							</li>
						</ul>
					</li>
				{/each}
			{/if}
			<li class="add-category">
				<svg fill="var(--cream)"><use xlink:href="#plus" /></svg>
				<Button
					style="tertiary"
					onClick={() => {
						currentCategory = undefined;
						showAddModal = true;
					}}>Add a category</Button>
			</li>
		</ul>
		<ul class="settings">
			<li><a href="/help"><svg><use xlink:href="#help" /></svg> Help</a></li>
			<li>
				<a href="/settings"><svg><use xlink:href="#cog" /></svg> Settings</a>
			</li>
			<li>
				<a href="/" on:click={signOut}
					><svg><use xlink:href="#log-out" /></svg> Logout</a>
			</li>
		</ul>
	</div>

	<Modal bind:showModal={showAddModal}>
		<h2 class="modalTitle">
			{currentCategory
				? `Edit your ${currentCategory.name} category`
				: 'Add a new category'}
		</h2>
		<form
			on:submit|preventDefault={currentCategory
				? onEditCategory
				: onAddCategory}
			id="category-actions">
			<Input
				inline
				label={currentCategory ? 'Rename category' : 'Category name'}
				type="text"
				name="category"
				id="category"
				placeholder={currentCategory
					? 'Enter a new name for your category'
					: 'Enter a name for your category'}
				value={currentCategory?.name || ''} />

			<p>
				{currentCategory
					? 'Select a new icon for your category  '
					: 'Select an icon for your category'}
			</p>
			<div class="icons">
				{#each icons as icon}
					<input
						type="radio"
						name="icon"
						value={icon}
						id="{icon}-icon"
						checked={icon === currentCategory?.iconId} />
					<label for="{icon}-icon"
						><svg><use xlink:href="#{icon}" /></svg></label>
				{/each}
			</div>
		</form>
		<Button slot="action" type="submit" form="category-actions"
			>{currentCategory ? 'Change category' : 'Add category'}</Button>
	</Modal>

	<Modal size="small" bind:showModal={showDeleteModal}>
		<div class="deleteModal">
			<h2>
				Are you sure you want to delete the <q>{currentCategory?.name}</q> category?
			</h2>
			<p>
				This will delete all of the reminders associated with this category and
				it can't be undone. If you want to keep the reminders make sure you
				assign them to a new category.
			</p>
		</div>

		<Button
			slot="action"
			type="submit"
			style="delete"
			form="category-actions"
			onClick={onDeleteCategory}>Yes delete</Button>
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
		margin-top: 8.8rem;
		position: fixed;
		background-color: var(--remindwise-grey);
		width: 100%;
		z-index: 2;
		border-top-left-radius: 12px;
		border-top-right-radius: 12px;
		overflow-x: hidden;
		overflow-y: scroll;
		flex-direction: column;
		height: 0;
		top: 100%;
		transition: all 0.5s linear;
	}

	.content.show {
		display: flex;
		top: 0;
		height: calc(100% - 8.8rem);
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
		color: var(--cream);
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

	.modalTitle {
		color: var(--remindwise-grey);
		font-size: 20px;
		font-weight: 600;
		line-height: 38px;
		margin-bottom: 2rem;
	}

	p {
		display: block;
		margin-top: 2rem;
		margin-bottom: 2rem;
		color: var(--remindwise-grey);
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
		cursor: pointer;
		display: inline-block;
		padding: 5px;
		border: 0.1rem solid transparent;
	}

	.icons label:hover {
		fill: var(--orange);
	}

	.icons svg {
		margin-right: 0.1rem;
	}

	input[type='radio'] {
		display: none;
	}

	input[type='radio']:active + label,
	input[type='radio']:checked + label {
		border-radius: 0.5rem;
		border: 1px solid var(--greyed-out);
		fill: var(--orange);
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
		padding: 0;
	}

	.options.active button {
		display: flex;
		justify-content: space-between;
		padding: 0;
		width: 100%;
	}

	.options svg {
		fill: var(--cream);
	}

	.deleteModal h2 {
		color: var(--remindwise-grey);
		text-align: center;
		font-size: 20px;
		font-weight: 600;
		line-height: 28px;
	}

	.deleteModal p {
		color: var(--remindwise-grey);
		text-align: center;
		font-size: 14px;
		font-weight: 300;
		margin: 0;
	}

	q {
		color: var(--orange);
		text-transform: capitalize;
		quotes: '‘' '’';
	}

	@media screen and (min-width: 768px) {
		.content {
			display: flex;
			position: relative;
			margin-top: 0;
			border-radius: 0;
			overflow: hidden;
			height: inherit;
			top: unset;
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
