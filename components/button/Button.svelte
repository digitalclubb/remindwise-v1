<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	interface $$Props extends HTMLButtonAttributes {
		style?: 'secondary' | 'tertiary' | 'delete';
		onClick?: () => void;
	}

	export let style: string | undefined = undefined;
	export let onClick: (() => void) | undefined = undefined;
</script>

<button
	{...$$restProps}
	class="button"
	class:secondary={style === 'secondary'}
	class:tertiary={style === 'tertiary'}
	class:delete={style === 'delete'}
	on:click={onClick}
>
	<slot />
</button>

<style>
	.button {
		background-color: var(--orange);
		border-radius: 2rem;
		border: solid 1px var(--orange);
		padding: 0.8rem 1.4rem;
		font-size: 1.4rem;
		line-height: 1.6rem;
		color: var(--white);
		font-weight: 400;
		text-align: center;
	}

	.button:hover {
		background-color: var(--orange-dark);
		border-color: var(--orange-dark);
		cursor: pointer;
	}

	.secondary {
		background: var(--cream-light);
		border-color: var(--cream);
		color: var(--grey);
	}

	.secondary:hover {
		background-color: var(--cream);
	}

	.tertiary {
		background: transparent;
		color: var(--orange);
		border: none;
		padding: 0;
	}

	.tertiary:hover {
		background: none;
		color: var(--orange-dark);
	}

	.delete {
		background-color: var(--red);
		border-color: var(--red);
	}

	.delete:hover {
		background-color: var(--red-dark);
		border-color: var(--red-dark);
	}
</style>
