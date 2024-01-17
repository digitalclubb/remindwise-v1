<script lang="ts">
    import {
        addCategoryStore,
		updateCategoryStore
	} from '$houdini';
    import { page } from '$app/stores';
    import { refresh } from '../../../stores';

    import Input from 'components/input/Input.svelte';
    import { Button } from 'components';

    import Modal from '../../modal/Modal.svelte';
    import { icons } from '../../icons/categories';
   

    import type { Categories } from '@graphql/types';

    export let showAddModal = false;
    export let currentCategory: Pick<Categories, 'id' | 'iconId' | 'name'> | undefined;

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
</script>

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
            value={currentCategory?.name || ''}
            required />

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

	p {
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