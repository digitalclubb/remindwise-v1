<script lang="ts" context="module">
	type T = Record<string, unknown>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
	import {
		formFieldProxy,
		type FormPathLeaves,
		type FormPathType,
		type SuperForm,
	} from 'sveltekit-superforms';
	import Input from '../input/Input.svelte';

	import type { FormEventHandler, HTMLInputAttributes } from 'svelte/elements';
	interface $$Props extends HTMLInputAttributes {
		superform: SuperForm<T>;
		field: FormPathLeaves<T>;
		categories?: { category: { name: string; iconId: string | null } }[];
		onInput?: FormEventHandler<HTMLInputElement>;
	}
	export let superform: SuperForm<T>;
	export let field: FormPathLeaves<T>;
	export let onInput: FormEventHandler<HTMLInputElement> | undefined =
		undefined;
	export let categories:
		| { category: { name: string; iconId: string | null } }[]
		| undefined = [];

	const { value, errors, constraints } = formFieldProxy(superform, field);

	let showCategories: boolean;

	const showCategoryList = () => {
		document.addEventListener('click', () => (showCategories = false));
		showCategories = true;
	};

	const hideCategoryList = () => {
		document.removeEventListener('click', () => (showCategories = false));
		showCategories = false;
	};

	const cast = (value: string) => {
		return value as FormPathType<T, FormPathLeaves<T>>;
	};
</script>

<Input
	label="Category"
	type="text"
	name="category"
	id="category"
	icon="icon-add"
	fullWidth
	placeholder="Type to select or create a new category"
	onInput={(e) => {
		$value = cast(e.currentTarget?.value);
		if ($value?.length || 0 > 1) {
			showCategoryList();
		} else {
			hideCategoryList();
		}
		onInput?.(e);
	}}
	autocomplete="off"
	aria-haspopup="listbox"
	aria-invalid={$errors ? 'true' : undefined}
	bind:value={$value}
	{...$constraints}
	{...$$restProps} />

{#if categories}
	<ul
		class="categories-list"
		class:show={showCategories}
		aria-labelledby="category">
		{#each categories as category}
			<li>
				<button
					type="button"
					on:click={() => {
						$value = cast(category.category.name);
						hideCategoryList();
					}}
					><svg fill="var(--cream-dark)"
						><use xlink:href="#{category.category.iconId}" /></svg
					>{category.category.name}</button>
			</li>
		{/each}

		{#if categories.length === 0}
			<li>
				<button
					class="category-select"
					type="button"
					on:click={hideCategoryList}>
					Category not found. It will be created when you add the reminder.</button>
			</li>
		{/if}
	</ul>
{/if}

<style>
	.categories-list {
		border-radius: 6px;
		border: 1px solid var(--greyed-out);
		background: var(--cream-light);
		display: none;
	}

	.show {
		display: block;
	}

	.categories-list li {
		padding: 0.5rem 1rem;
	}

	.categories-list li:hover {
		background: var(--cream);
		cursor: pointer;
	}

	.categories-list li:hover svg {
		fill: var(--remindwise-grey);
	}

	.categories-list button {
		width: 100%;
		background: none;
		border: none;
		text-align: left;
		cursor: pointer;
		margin-left: 0;
	}

	.categories-list svg {
		width: 1.8rem;
		height: 1.8rem;
		margin-right: 1rem;
		vertical-align: middle;
	}
</style>
