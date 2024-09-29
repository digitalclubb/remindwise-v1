<script lang="ts">
	import { AddCategoryStore, UpdateCategoryStore } from '$houdini';
	import { page } from '$app/stores';
	import { defaults, superForm } from 'sveltekit-superforms/client';
	import { refresh } from '../../../stores';

	import Input from '../../input/Input.svelte';
	import Button from '../../button/Button.svelte';

	import Modal from '../../modal/Modal.svelte';
	import { icons } from '../../icons/categories';

	import { addCategorySchema } from './schema';

	import type { Category } from '@graphql/types';
	import { zod } from 'sveltekit-superforms/adapters';

	export let showAddModal = false;
	export let currentCategory:
		| Pick<Category, 'id' | 'icon_id' | 'name'>
		| undefined;

	$: {
		form.set({
			category: currentCategory?.name || '',
			icon: currentCategory?.icon_id || '',
		});
	}

	const { form, errors, constraints, validateForm } = superForm(
		defaults(zod(addCategorySchema)),
		{
			SPA: true,
			validators: zod(addCategorySchema),
		}
	);

	const onAddCategory = async () => {
		const addCategory = new AddCategoryStore();
		const { valid, errors: validatedErrors, data } = await validateForm();

		if (!valid) {
			$errors = { ...validatedErrors };
			return;
		}

		await addCategory.mutate({
			category: data.category,
			iconId: data.icon,
			userId: $page.data.session?.user.id,
		});

		showAddModal = false;
		refresh.update((n) => !n);
	};

	const onEditCategory = async () => {
		const updateCategory = new UpdateCategoryStore();
		const { valid, errors: validatedErrors, data } = await validateForm();

		if (!valid) {
			$errors = { ...validatedErrors };
			return;
		}

		await updateCategory.mutate({
			id: currentCategory?.id,
			name: data.category,
			iconId: data.icon,
		});

		currentCategory = undefined;
		showAddModal = false;
		refresh.update((n) => !n);
	};
</script>

<Modal bind:showModal={showAddModal}>
	<h2 class="modalTitle">
		{currentCategory
			? `Edit your ${currentCategory.name} category`
			: 'Add a new category'}
	</h2>
	<form
		method="post"
		on:submit|preventDefault={currentCategory ? onEditCategory : onAddCategory}
		id="category-actions"
		novalidate>
		<Input
			fullWidth
			label="Category name"
			type="text"
			name="category"
			id="category"
			aria-invalid={$errors.category ? 'true' : undefined}
			bind:value={$form.category}
			{...$constraints.category} />

		{#if $errors.category}
			<p class="error">{$errors.category}</p>
		{/if}

		<p class="selectIntro">Select an icon for your category</p>
		<div class="icons">
			{#each icons as icon}
				<input
					type="radio"
					name="icon"
					value={icon}
					id="{icon}-icon"
					bind:group={$form.icon}
					{...$constraints.icon} />
				<label for="{icon}-icon">
					<span class="visually-hidden">{icon} icon</span>
					<svg><use xlink:href="#{icon}" /></svg>
				</label>
			{/each}
		</div>
		{#if $errors.icon}
			<p class="error">{$errors.icon}</p>
		{/if}
	</form>
	<Button slot="action" type="submit" form="category-actions"
		>{currentCategory ? 'Update category' : 'Add category'}</Button>
</Modal>

<style>
	.icons::-webkit-scrollbar {
		width: 0.7rem;
	}

	.icons::-webkit-scrollbar-track {
		background-color: var(--cream);
	}

	.icons::-webkit-scrollbar-thumb {
		background-color: var(--orange);
		border-radius: 0.6rem;
	}

	.modalTitle {
		color: var(--remindwise-grey);
		font-size: 20px;
		font-weight: 600;
		line-height: 38px;
		margin-bottom: 2rem;
	}

	.selectIntro {
		display: block;
		margin-top: 2rem;
		margin-bottom: 2rem;
		color: var(--remindwise-grey);
	}

	.icons {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		max-height: 55rem;
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
		width: 2.6rem;
		height: 2.6rem;
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

	.visually-hidden {
		position: absolute;
		margin: -1px;
		border: 0;
		width: 1px;
		height: 1px;
		clip: rect(0 0 0 0);
		clip-path: inset(50%);
		overflow: hidden;
		white-space: nowrap;
		word-wrap: normal;
	}
</style>
