<script lang="ts">
	import type { FormEventHandler, HTMLInputAttributes } from 'svelte/elements';
	interface $$Props extends HTMLInputAttributes {
		label?: string;
		inline?: boolean;
		fullWidth?: boolean;
		value?: string | number;
		icon?: string;
		onInput?: FormEventHandler<HTMLInputElement>;
	}

	export let label: string | undefined = undefined;
	export let inline: boolean = false;
	export let fullWidth: boolean = false;
	export let value: string | number | null = null;
	export let icon: string | null = null;
	export let onInput: FormEventHandler<HTMLInputElement> | undefined =
		undefined;
</script>

{#if label}
	<label class:inline for={$$props.id}
		>{label}<i aria-hidden="true" hidden={!$$props.required}>*</i></label>
{/if}

{#if icon}
	<div class="icon-wrapper">
		<svg>
			<use xlink:href={`#${icon}`}></use>
		</svg>

		<input
			class:inline
			class:fullWidth
			class:icon
			bind:value
			{...$$restProps}
			on:input={onInput} />
	</div>
{:else}
	<input
		class:inline
		class:fullWidth
		class:icon
		bind:value
		{...$$restProps}
		on:input={onInput} />
{/if}

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
		font-weight: 400;
	}

	input[aria-invalid] {
		border: solid 1px var(--red);
		background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
		background-repeat: no-repeat;
		background-position: right 1rem center;
		background-size: 1.6rem;
	}

	.inline {
		display: inline-block;
	}

	.fullWidth {
		width: 100%;
	}

	.icon-wrapper {
		position: relative;
	}

	.icon-wrapper svg {
		display: block;
		color: var(--orange);
		width: 1.4rem;
		height: 1.4rem;
		position: absolute;
		top: 50%;
		left: 1.3rem;
		transform: translateY(-50%);
	}

	.icon {
		padding-left: 3.8rem;
	}
</style>
