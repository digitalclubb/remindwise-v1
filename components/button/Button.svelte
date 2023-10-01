<script lang="ts">
	export let style = 'primary';
	export let element = 'button';
</script>

<svelte:element
	this={element}
	{...$$restProps}
	class="button"
	class:primary={style === 'secondary'}
	class:secondary={style === 'secondary'}
	class:delete={style === 'delete'}
>
	<slot />
</svelte:element>

<style>
	.button {
		background: var(--orange-gradient);
		border-radius: 2rem;
		border: solid 1px var(--orange);
		padding: 0.8rem 1.4rem;
		font-size: 1.4rem;
		line-height: 1.6rem;
		color: var(--cream-light);
		font-weight: 600;
		text-align: center;
	}

	.button:hover {
		background: var(--orange-dark);
		border-color: var(--orange-dark);
		cursor: pointer;
	}

	.secondary {
		background-color: var(--cream-light);
		border-color: var(--cream);
		color: var(--grey);
	}

	.secondary:hover {
		background-color: var(--cream);
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
