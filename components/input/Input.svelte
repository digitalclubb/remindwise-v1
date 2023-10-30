<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	interface $$Props extends HTMLInputAttributes {
		label?: string;
	}

	export let label: string | undefined = undefined;
</script>

{#if label}
	<label for={$$props.id}
		>{label}<i aria-hidden="true" hidden={!$$props.required}>*</i></label
	>
{/if}

<input {...$$restProps} />

<style>
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
</style>
