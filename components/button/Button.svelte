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
		background-color: #ea743c;
		border-radius: 2rem;
		border: none;
		padding: 0.8rem 1.4rem;
		font-size: 1.4rem;
		line-height: 1.6rem;
		color: #ffffff;
		font-weight: 600;
		text-align: center;
	}

	.button:hover {
		background-color: #c25420;
		cursor: pointer;
	}

	.secondary {
		background-color: #ebe8e2;
		color: #373f48;
	}

	.secondary:hover {
		background-color: #ebe8e2;
	}

	.delete {
		background-color: #da4b37;
	}

	.delete:hover {
		background-color: #c94331;
	}
</style>
