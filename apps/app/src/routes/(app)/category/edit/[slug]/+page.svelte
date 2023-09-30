<script lang="ts">
	import { navigating, page } from '$app/stores';
	import deleteCategory from '@graphql/mutations/deleteCategory.graphql';
	import updateCategory from '@graphql/mutations/updateCategory.graphql';
	import Button from 'components/button/Button.svelte';
	import Modal from '../../../../../components/modal/Modal.svelte';
	import { goto } from '$app/navigation';
	import {
		getContextClient,
		gql,
		mutationStore,
		queryStore,
	} from '@urql/svelte';
	import { refresh } from '../../../../../stores';
	import { icons } from '../../../../../components/icons/icons';
	const previousPage = $navigating?.from ? $navigating.from.url.pathname : '/';

	let showModal = false;
	export let data;

	$: ({ getCategoryId } = data);

	$: category = $getCategoryId.data?.categories?.list[0].category;
	// const category = queryStore<GetCategoryIdQuery, GetCategoryIdQueryVariables>({
	// 	client,
	// 	query: gql`
	// 		${getCategoryId}
	// 	`,
	// 	variables: {
	// 		category: $page.params.slug,
	// 	},
	// });

	const onDelete = async () => {
		// mutationStore<DeleteCategoryMutation, DeleteCategoryMutationVariables>({
		// 	client,
		// 	query: gql`
		// 		${deleteCategory}
		// 	`,
		// 	variables: {
		// 		category: $page.params.slug,
		// 	},
		// }).subscribe((result) => {
		// 	if (result.error) {
		// 		// Error
		// 		console.log('Error', result);
		// 	}
		// 	if (result.data) {
		// 		refresh.update((n) => !n);
		// 		goto('/');
		// 	}
		// });
	};

	const editCategory = (event: SubmitEvent) => {
		const formData = new FormData(event.target as HTMLFormElement);
		// mutationStore<UpdateCategoryMutation, UpdateCategoryMutationVariables>({
		// 	client,
		// 	query: gql`
		// 		${updateCategory}
		// 	`,
		// 	variables: {
		// 		name: formData.get('category')?.toString().toLowerCase(),
		// 		iconId: formData.get('icons')?.toString(),
		// 		// id: $category.data?.categories?.list[0].category.id,
		// 	},
		// }).subscribe((result) => {
		// 	//TODO error handling
		// 	if (result.data) {
		// 		refresh.update((n) => !n);
		// 		goto(previousPage);
		// 	}
		// });
	};
</script>

<h1>Edit <span>{$page.params.slug}</span> category</h1>

{#if $getCategoryId.fetching}
	<li>Loading...</li>
{:else if $getCategoryId.error}
	<li>{$getCategoryId.error.message}</li>
{:else}
	<form on:submit|preventDefault={editCategory}>
		<label for="category" class="input-label">Category name</label>
		<input
			type="text"
			name="category"
			id="category"
			required
			value={category.name ?? ''}
		/>

		<h3>Pick an icon</h3>
		<div class="icons">
			{#each icons as icon}
				<input
					type="radio"
					name="icons"
					value={icon}
					id="{icon}-icons"
					checked={icon === category.iconId}
				/>
				<label for="{icon}-icons"><svg><use xlink:href="#{icon}" /></svg></label
				>
			{/each}
		</div>
		<Button type="submit">Update</Button>
	</form>
{/if}

<Button on:click={() => (showModal = true)}>Delete Category</Button>

<Modal bind:showModal>
	<h2>Are you sure you want to delete this category?</h2>
	<p>
		Deleting this category will delete all of the reminders associated with it.
	</p>
	<Button on:click={onDelete}>Delete</Button>
</Modal>

<style>
	.input-label {
		font-size: 1.8rem;
		margin-bottom: 0.5rem;
		width: 100%;
		display: block;
		user-select: none;
		font-weight: bold;
	}

	input[type='text'] {
		height: 5rem;
		border-radius: 0.5rem;
		border: 1px solid #ced6e0;
		transition: all 0.3s ease-in-out;
		font-size: 1.6rem;
		padding: 0.5rem 1.5rem;
		width: 100%;
	}
	svg {
		width: 1.8rem;
		height: 1.8rem;
		vertical-align: middle;
		margin-right: 0.6rem;
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
		display: inline-block;
		padding: 5px;
		cursor: pointer;
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
</style>
