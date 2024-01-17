<script lang="ts">
    import {
		deleteCategoryStore
	} from '$houdini';
    import { goto } from '$app/navigation';
    import { refresh } from '../../../stores';

    import { Button } from 'components';
    import Modal from '../../modal/Modal.svelte';

    import type { Categories } from '@graphql/types';

    export let showDeleteModal = false;
    export let currentCategory: Pick<Categories, 'id' | 'iconId' | 'name'> | undefined;
    export let selected: string;

    const onDeleteCategory = async () => {
		const deleteCategory = new deleteCategoryStore();

		await deleteCategory.mutate({ id: currentCategory?.id });

		if (currentCategory?.name === selected) {
			await goto('/');
		}

		showDeleteModal = false;
		currentCategory = undefined;
		refresh.update((n) => !n);
	};
</script>

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

<style>
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
</style>