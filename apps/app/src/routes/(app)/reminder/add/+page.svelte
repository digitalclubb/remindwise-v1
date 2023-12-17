<script lang="ts">
	import { Button } from 'components';
</script>

<svelte:head>
	<title>Add a new reminder · remindwise.io</title>
</svelte:head>

<div class="actions">
	<Button type="submit">Add this reminder</Button>
</div>

<style>
	.actions {
		display: flex;
		justify-content: flex-end;
		margin-top: 6rem;
	}
</style>
