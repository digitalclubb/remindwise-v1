<script lang="ts">
	export let style = '';
	export let type = '';
	export let href = '';
</script>

<a
	{...$$restProps}
	{href}
	class:button={type === 'button'}
	class:secondary={style === 'secondary'}
	class:delete={style === 'delete'}
>
	<slot />
</a>

<style>
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
