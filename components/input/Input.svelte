<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	interface $$Props extends HTMLInputAttributes {
		label?: string;
		inline?: boolean;
		fullWidth?: boolean;
		value?: string | number;
	}

	export let label: string | undefined = undefined;
	export let inline: boolean = false;
	export let fullWidth: boolean = false;
	export let value: string | number | null = null;
</script>

{#if label}
	<label class:inline for={$$props.id}
		>{label}<i aria-hidden="true" hidden={!$$props.required}>*</i></label>
{/if}

<input class:inline class:fullWidth bind:value {...$$restProps} />

<style>
	label {
		display: block;
		margin-right: 0.7rem;
		margin-bottom: 0.7rem;
		color: var(--remindwise-grey);
	}

	i {
		font-style: normal;
		color: var(--red);
	}

	input {
		display: block;
		border: 1px solid var(--greyed-out);
		border-radius: 0.6rem;
		padding: 0.9rem 1.4rem;
	}

	.inline {
		display: inline-block;
	}

	.fullWidth {
		width: 100%;
	}
</style>
