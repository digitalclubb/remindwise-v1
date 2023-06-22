<script lang="ts">
	import { page } from '$app/stores';
	import Button from 'components/button/Button.svelte';
	import Modal from '../../../../../components/modal/Modal.svelte';
	import { goto } from '$app/navigation';
	import { getContextClient, gql, mutationStore } from '@urql/svelte';
	// TODO
	// - Navigation doesnt update deletion
	// - Tidy up styles (modal, buttons, etc)
	// - Edit category name and icon?
	const client = getContextClient();

	let showModal = false;

	const onDelete = async () => {
		mutationStore({
			client,
			query: gql`
				mutation ($category: String!) {
					deleteFromcategoriesCollection(filter: { name: { eq: $category } }) {
						affectedCount
					}
				}
			`,
			variables: {
				category: $page.params.slug,
			},
		}).subscribe((result) => {
			if (result.error) {
				// Error
				console.log('Error', result);
			}

			if (result.data) {
				goto('/');
			}
		});
	};
</script>

<h1>Edit <span>{$page.params.slug}</span> category</h1>

<Button on:click={() => (showModal = true)}>Delete Category</Button>

<Modal bind:showModal>
	<h2>Are you sure you want to delete this category?</h2>
	<p>
		Deleting this category will delete all of the reminders associated with it.
	</p>

	<Button on:click={onDelete}>Delete</Button>
</Modal>
