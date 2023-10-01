<script lang="ts">
	import { page } from '$app/stores';
	import Button from 'components/button/Button.svelte';
	import Modal from '../../../../../components/modal/Modal.svelte';
	import { goto } from '$app/navigation';

	import { refresh } from '../../../../../stores';
	import { icons } from '../../../../../components/icons/icons';
	import { enhance } from '$app/forms';

	let showModal = false;
	export let data;
	export let form;

	$: ({ getCategoryId } = data);

	$: category = $getCategoryId.data?.categories?.list[0].category;

	$: if (form?.success) {
		refresh.update((n) => !n);
		goto(`/category/${form?.category}`);
	}
</script>

<h1>Edit <span>{$page.params.slug}</span> category</h1>

{#if $getCategoryId.fetching}
	<li>Loading...</li>
{:else if $getCategoryId.error}
	<li>{$getCategoryId.error.message}</li>
{:else}
	<form method="POST" action="?/edit" use:enhance>
		{#if form?.missing}<p class="error">The category field is required</p>{/if}
		<label for="category" class="input-label">Category name</label>
		<input
			type="text"
			name="category"
			id="category"
			required
			value={category.name ?? ''}
		/>
		<input
			type="hidden"
			id="categoryId"
			name="categoryId"
			value={category.id ?? ''}
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
	<form method="POST" action="?/delete">
		<Button>Delete</Button>
	</form>
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
