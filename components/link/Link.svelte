<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	interface $$Props extends HTMLAnchorAttributes {
		style?: 'secondary' | 'delete';
		type?: 'button';
	}

	export let style: 'secondary' | 'delete' | undefined = undefined;
	export let type: 'button' | undefined = undefined;
</script>

<a
	{...$$restProps}
	href={$$props.href}
	class:button={type === 'button'}
	class:secondary={style === 'secondary'}
	class:delete={style === 'delete'}>
	<slot />
</a>

<style>
	a {
		display: flex;
		align-items: center;
		color: var(--orange);
		text-decoration: none;
	}

	a:hover {
		color: var(--orange-dark);
		text-decoration: underline;
	}

	.button {
		background-color: var(--orange);
		border-radius: 2rem;
		border: solid 1px var(--orange);
		display: inline-block;
		padding: 0.8rem 1.4rem;
		font-size: 1.4rem;
		line-height: 1.6rem;
		color: var(--white);
		font-weight: 400;
		text-align: center;
		text-decoration: none;
	}

	.button:hover {
		background-color: var(--orange-dark);
		border-color: var(--orange-dark);
		color: var(--white);
		cursor: pointer;
	}

	.button.secondary {
		background-color: var(--cream-light);
		border-color: var(--cream);
		color: var(--grey);
	}

	.button.secondary:hover {
		background-color: var(--cream);
	}

	.button.delete {
		background-color: var(--red);
		border-color: var(--red);
	}

	.button.delete:hover {
		background-color: var(--red-dark);
		border-color: var(--red-dark);
	}
</style>
