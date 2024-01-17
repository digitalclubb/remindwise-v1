<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from 'components';
	import { navigating, page } from '$app/stores';
	import { deleteReminderStore } from '$houdini';

	import Modal from '../../../../../components/modal/Modal.svelte';

	let showModal = false;
	let previousPage = $navigating?.from?.url.pathname;

	const onDelete = async () => {
		const deleteReminder = new deleteReminderStore();
		await deleteReminder.mutate({ id: $page.params.slug });

		await goto(`/category/${$page.data.form.data.category}`);

		// TODO: delete any files?
		if ($page.data.files.length) {

		}
	};
</script>

<svelte:head>
	<title>Edit "{$page.data.form.data.name}" · remindwise.io</title>
</svelte:head>

<div class="actions">
	<Button type="button" style="delete" onClick={() => (showModal = true)}
		>Delete this reminder</Button>
	<div>
		<Button
			type="button"
			style="secondary"
			onClick={() => {
				goto(previousPage || '/');
			}}>Cancel</Button>
		<Button type="submit">Update reminder</Button>
	</div>
</div>

<Modal size="small" bind:showModal>
	<div class="deleteModal">
		<h2 class="heading-3">Are you sure you want to delete this reminder?</h2>
		<p>This action can't be undone</p>
	</div>

	<Button type="button" slot="action" style="delete" onClick={onDelete}
		>Yes delete</Button>
</Modal>

<style>
	.actions {
		display: flex;
		justify-content: space-between;
		margin-top: 6rem;
	}

	.actions div {
		display: flex;
		gap: 1rem;
	}

	.deleteModal {
		text-align: center;
	}

	.deleteModal p {
		font-weight: 300;
	}
</style>
