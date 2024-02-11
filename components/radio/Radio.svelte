<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { InputConstraint } from 'sveltekit-superforms';
	interface $$Props extends HTMLInputAttributes {
		legend?: string;
		options?: { label: string; id: string; value: number | boolean | string }[];
		group: string | unknown;
		constraints?: InputConstraint;
	}

	export let legend: string | undefined = undefined;
	export let options: {
		label: string;
		id: string;
		value: number | boolean | string;
	}[] = [];
	export let group: string | unknown;
	export let constraints: InputConstraint | undefined = undefined;
</script>

<fieldset class="options">
	<legend
		>{legend}<i aria-hidden="true" hidden={!$$props.required}>*</i></legend>
	{#each options as option}
		<div class="option">
			<input
				type="radio"
				id={option.id}
				value={option.value}
				bind:group
				{...constraints}
				{...$$restProps} />
			<label for={option.id}>{option.label}</label>
		</div>
	{/each}
</fieldset>

<style>
	fieldset {
		all: unset;
	}

	i {
		font-style: normal;
		color: var(--red);
	}

	legend {
		display: inline-block;
		margin-bottom: 1rem;
	}

	.options,
	.option {
		display: flex;
		flex: 1;
	}

	.option input {
		position: absolute;
		visibility: hidden;
	}

	.option label {
		background-color: var(--cream-light);
		border-top: 1px solid var(--cream);
		border-bottom: 1px solid var(--cream);
		border-right: 1px solid var(--cream);
		padding-top: 1rem;
		padding-bottom: 1rem;
		margin-bottom: 0;
		width: 100%;
		text-align: center;
	}

	.option:first-of-type label {
		border-top-left-radius: 2rem;
		border-bottom-left-radius: 2rem;
	}

	.option:last-of-type label {
		border-top-right-radius: 2rem;
		border-bottom-right-radius: 2rem;
		border-right: none;
	}

	.option label:hover {
		background-color: var(--cream);
		cursor: pointer;
	}

	.options input[type='radio']:checked + label {
		background-color: var(--orange);
		color: var(--white);
	}

	.option input[aria-invalid] + label {
		border-color: var(--red);
	}
</style>
