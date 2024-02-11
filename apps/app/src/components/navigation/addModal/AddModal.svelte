<script lang="ts">
	import { addCategoryStore, updateCategoryStore } from '$houdini';
	import { page } from '$app/stores';
	import { superForm, superValidateSync } from 'sveltekit-superforms/client';
	import { refresh } from '../../../stores';

	import Input from 'components/input/Input.svelte';
	import { Button } from 'components';

	import Modal from '../../modal/Modal.svelte';
	import { icons } from '../../icons/categories';

	import { addCategorySchema } from './schema';

	import type { Categories } from '@graphql/types';

	export let showAddModal = false;
	export let currentCategory:
		| Pick<Categories, 'id' | 'iconId' | 'name'>
		| undefined;

	const superValidate = superValidateSync(addCategorySchema);
	const { form, errors, constraints } = superForm(superValidate, {
		validators: addCategorySchema,
	});

	const onAddCategory = async () => {
		const addCategory = new addCategoryStore();
		const {
			valid,
			data,
			errors: validatedErrors,
		} = superValidateSync($form, addCategorySchema);

		if (!valid) {
			$errors = { ...validatedErrors };
			return;
		}

		await addCategory.mutate({
			category: data.category,
			isLocked: false,
			iconId: data.icon,
			userId: $page.data.session?.user.id,
		});

		showAddModal = false;
		refresh.update((n) => !n);
	};

	const onEditCategory = async (event: SubmitEvent) => {
		const updateCategory = new updateCategoryStore();
		const {
			valid,
			data,
			errors: validatedErrors,
		} = superValidateSync($form, addCategorySchema);

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
		on:submit|preventDefault={currentCategory ? onEditCategory : onAddCategory}
		id="category-actions"
		novalidate>
		<Input
			fullWidth
			label={currentCategory ? 'Rename category' : 'Category name'}
			type="text"
			name="category"
			id="category"
			aria-invalid={$errors.category ? 'true' : undefined}
			bind:value={$form.category}
			{...$constraints.category} />

		{#if $errors.category}
			<p class="error">{$errors.category}</p>
		{/if}

		<p class="selectIntro">
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
					bind:group={$form.icon}
					{...$constraints.icon} />
				<label for="{icon}-icon"><svg><use xlink:href="#{icon}" /></svg></label>
			{/each}
		</div>
		{#if $errors.icon}
			<p class="error">{$errors.icon}</p>
		{/if}
	</form>
	<Button slot="action" type="submit" form="category-actions"
		>{currentCategory ? 'Change category' : 'Add category'}</Button>
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
</style>
