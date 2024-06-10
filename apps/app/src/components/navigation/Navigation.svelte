<script lang="ts">
	import { browser } from '$app/environment';

	import AddModal from './addModal/AddModal.svelte';
	import DeleteModal from './deleteModal/DeleteModal.svelte';

	import { Button } from 'components';

	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { refresh } from '../../stores';

	import { getSettingsStore, getCategoriesStore } from '$houdini';
	import Link from 'components/link/Link.svelte';

	import type { Categories } from '@graphql/types';
	import { onMount } from 'svelte';

	let mounted: boolean = false;
	onMount(() => (mounted = true));

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
	let navFullHeight = false;
	let navHeight: number;

	let isDragging = false;
	let startY: number;
	let startHeight: number;

	const navContent = browser
		? (document.querySelector('.content') as HTMLElement)
		: null;

	// Show navigation on button click
	const showNav = () => {
		showNavigation = true;
		document.body.style.overflowY = 'hidden';
		updateNavHeight(90);
	};

	const hideNav = () => {
		showNavigation = false;
		document.body.style.overflowY = 'auto';
	};

	// Update the height on show or drag2w
	const updateNavHeight = (height: number) => {
		navHeight = height;
		if (height === 100) navFullHeight = true;
	};

	// Drag icon mousedown or touchstart
	const dragStart = (e: MouseEvent | TouchEvent) => {
		isDragging = true;
		startY = (e as MouseEvent).pageY || (e as TouchEvent).touches?.[0].pageY;
		startHeight = parseInt(navContent?.style.height || '');
	};

	// Document mousemove or touchmove
	const dragging = (e: MouseEvent | TouchEvent) => {
		if (!isDragging) return;
		const delta =
			startY -
			((e as MouseEvent).pageY || (e as TouchEvent).touches?.[0].pageY);
		const newHeight = startHeight + (delta / window.innerHeight) * 100;
		updateNavHeight(newHeight);
	};

	// Document mouseup or touchend
	const dragStop = () => {
		isDragging = false;
		const sheetHeight = parseInt(navContent?.style.height || '');
		sheetHeight < 25
			? hideNav()
			: sheetHeight > 75
				? updateNavHeight(100)
				: updateNavHeight(90);
	};

	// document only exists in the browser
	if (browser) {
		document.addEventListener('mousemove', dragging);
		document.addEventListener('touchmove', dragging);
		document.addEventListener('mouseup', dragStop);
		document.addEventListener('touchend', dragStop);
	}

	$: selected = $page.url.pathname.includes('category')
		? $page.url.pathname.split('/')[2]
		: '';

	$: clicked = -1;

	const signOut = async () => {
		await $page.data.supabase.auth.signOut();
		await goto('/login');
	};

	const onClickOptions = (index: number) => {
		if (clicked === index) {
			document.removeEventListener('click', () => (clicked = -1));
			clicked = -1;
		} else {
			document.addEventListener('click', () => (clicked = -1));
			clicked = index;
		}
	};

	const getUsername = () => {
		if (settings?.first_name !== null)
			return settings?.first_name + ' ' + (settings?.last_name || '');
		return settings?.email;
	};
</script>

<div>
	<div class="header">
		<a href="/"
			><img
				src="/logo.svg"
				alt="remindwise.io logo"
				class="logo"
				width="170"
				height="27" /></a>
		<button disabled={!mounted} on:click={showNav} aria-label="Menu button"
			><svg aria-hidden="true" class="menu">
				<use xlink:href="#icon-menu"></use>
			</svg></button>
	</div>

	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<nav
		class="navigation"
		class:show={showNavigation}
		class:fullscreen={navFullHeight}
		class:dragging={isDragging}>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="overlay" on:click={hideNav} hidden={!showNavigation}></div>
		<div class="content" style="height:{navHeight}vh;">
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class="drag-icon"
				on:mousedown={(event) => dragStart(event)}
				on:touchstart={(event) => dragStart(event)}>
				<span></span>
			</div>
			<div class="nav-body">
				<div class="profile">
					{#if $settingsStore.fetching}
						<li>Loading...</li>
					{:else if $settingsStore.errors}
						<li>{$settingsStore.errors}</li>
					{:else if settings}
						<h3>
							<svg>
								<use xlink:href="#icon-profile"></use>
							</svg>
							{getUsername()}
						</h3>
					{/if}

					<Link type="button" href="/reminder/add" on:click={hideNav}
						><svg class="add">
							<use xlink:href="#icon-add"></use>
						</svg> Add a new reminder</Link>
				</div>
				<div class="overflow">
					<ul class="categories">
						<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
						<li class:selected={selected === ''} on:click={hideNav}>
							<a href="/"
								><svg>
									<use xlink:href="#icon-dashboard"></use>
								</svg> Dashboard</a>
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
									on:click={hideNav}>
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
										disabled={!mounted}
										on:click={(e) => {
											e.stopPropagation();
											onClickOptions(index);
										}}
										aria-label={'Options for ' + category.category.name}
										><svg aria-hidden="true">
											<use xlink:href="#icon-edit"></use>
										</svg></button>
									<ul class="options" class:active={clicked === index}>
										<li>
											<button
												class="edit"
												aria-label={'Edit ' + category.category.name}
												on:click={() => {
													currentCategory = {
														id: category.category.id,
														name: category.category.name,
														iconId: category.category.iconId,
													};
													showAddModal = true;
													clicked = -1;
												}}
												>Edit <svg aria-hidden="true">
													<use xlink:href="#icon-edit-category"></use>
												</svg></button>
										</li>
										<li>
											<button
												aria-label={'Delete ' + category.category.name}
												on:click={() => {
													currentCategory = {
														id: category.category.id,
														name: category.category.name,
														iconId: category.category.iconId,
													};
													showDeleteModal = true;
													clicked = -1;
												}}
												>Delete <svg aria-hidden="true">
													<use xlink:href="#icon-delete"></use>
												</svg></button>
										</li>
									</ul>
								</li>
							{/each}
						{/if}
						<li class="add-category">
							<svg>
								<use xlink:href="#icon-add"></use>
							</svg>
							<Button
								style="tertiary"
								onClick={() => {
									currentCategory = undefined;
									showAddModal = true;
								}}>Add a category</Button>
						</li>
					</ul>
					<ul class="settings">
						<li>
							<a href="/help"
								><svg>
									<use xlink:href="#icon-help"></use>
								</svg> Help</a>
						</li>
						<li>
							<a href="/settings"
								><svg>
									<use xlink:href="#icon-settings"></use>
								</svg> Settings</a>
						</li>
						<li>
							<a href="/" on:click={signOut}
								><svg>
									<use xlink:href="#icon-logout"></use>
								</svg> Logout</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</nav>
	<AddModal bind:showAddModal bind:currentCategory />

	<DeleteModal bind:showDeleteModal {currentCategory} {selected} />
</div>

<style>
	.header {
		grid-area: header;
		background-color: var(--remindwise-grey);
		align-self: flex-start;
		padding: 2.4rem 2.1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}
	.navigation {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		opacity: 0;
		pointer-events: none;
		transition: 0.1s linear;
		z-index: 1;
	}

	.navigation.show {
		opacity: 1;
		pointer-events: auto;
	}

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
		width: 100%;
		height: 100%;
		opacity: 0.2;
		background: #000000;
	}

	.content {
		width: 100%;
		position: relative;
		background-color: var(--remindwise-grey);
		max-height: 100vh;
		height: 50vh;
		transform: translateY(100%);
		border-radius: 1.2rem 1.2rem 0 0;
		transition: 0.3s ease;
	}

	.show .content {
		transform: translateY(0%);
	}
	.dragging .content {
		transition: none;
	}
	.fullscreen .content {
		border-radius: 0;
		overflow-y: hidden;
	}

	.drag-icon {
		cursor: grab;
		user-select: none;
		padding: 15px;
	}

	.drag-icon span {
		height: 4px;
		width: 40px;
		display: block;
		background: #c7d0e1;
		border-radius: 50px;
		margin: 0 auto;
	}

	.content svg {
		height: 1.8rem;
		width: 1.8rem;
		vertical-align: middle;
	}

	.logo {
		width: 14rem;
		height: 2.7rem;
	}

	.menu {
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
		word-break: break-all;
	}

	.content .add {
		height: 1.4rem;
		margin-right: 0.9rem;
	}

	.nav-body {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.overflow {
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.overflow::-webkit-scrollbar {
		width: 0.7rem;
	}

	.overflow::-webkit-scrollbar-track {
		background-color: var(--cream);
	}

	.overflow::-webkit-scrollbar-thumb {
		background-color: var(--orange);
		border-radius: 0.6rem;
	}

	.categories {
		flex: 1;
	}

	li {
		color: var(--cream);
		font-weight: 500;
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

	.edit svg {
		fill: var(--cream);
	}

	.count {
		font-weight: 300;
	}

	.content {
		padding-bottom: 3.5rem;
	}

	.content a {
		color: var(--cream);
		text-decoration: none;
		display: flex;
		align-items: center;
		gap: 1.2rem;
		flex-grow: 2;
		padding: 1rem 0 1rem 3.4rem;
	}

	.content a:hover {
		color: var(--orange);
	}

	.selected {
		background-color: var(--grey-dark);
	}

	.selected a img {
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
		position: absolute;
		background-color: var(--orange);
		color: var(--cream);
		border-radius: 3px 0 3px 3px;
		flex-direction: column;
		width: 12.3rem;
		top: 2.9rem;
		z-index: 1;
		right: 1.7rem;
	}

	.options.active {
		display: flex;
	}

	.options li {
		padding: 1.5rem;
	}

	.options li:hover {
		background-color: var(--orange-dark);
	}

	.options button {
		display: flex;
		justify-content: space-between;
		padding: 0;
		width: 100%;
	}

	@media screen and (min-width: 1024px) {
		.header {
			justify-content: center;
		}

		.header button,
		.drag-icon {
			display: none;
		}

		.navigation {
			display: block;
			position: static;
			opacity: 1;
			grid-area: navigation;
			pointer-events: auto;
			height: calc(100% - 7.5rem);
		}

		.content {
			transform: translateY(0);
			height: 100% !important; /*yuk*/
			max-height: none;
			border-radius: 0;
		}

		.overflow {
			overflow-y: visible;
		}

		.profile {
			background-color: var(--grey-light);
			padding: 2.5rem 3.6rem 6.5rem 3.6rem;
			gap: 2.2rem;
		}

		.content a {
			padding: 1rem 0 1rem 4rem;
		}

		.settings {
			position: sticky;
			bottom: 3.5rem;
		}
	}
</style>
