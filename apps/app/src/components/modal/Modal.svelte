<script lang="ts">
	import Button from 'components/button/Button.svelte';

	export let showModal: boolean;
	export let size: 'small' | undefined = undefined;
	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
	$: if (dialog && showModal === false) dialog.close();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	class:small={size === 'small'}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot />
		<div class="actions" class:small={size === 'small'}>
			<Button style="secondary" onClick={() => dialog.close()}>Cancel</Button>
			<slot name="action" />
		</div>
	</div>
</dialog>

<style>
	dialog {
		width: 75rem;
		height: 75rem;
		border-radius: 0.5rem;
		border: none;
		padding: 0;
	}

	.small {
		width: 36.9rem;
		height: 28rem;
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 2.4rem;
	}

	.small > div {
		padding: 4rem;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.actions {
		margin-top: 4rem;
		display: flex;
		gap: 1.5rem;
		justify-content: flex-end;
	}

	.small .actions {
		width: inherit;
		height: inherit;
		justify-content: center;
		margin-top: 1rem;
	}
</style>
