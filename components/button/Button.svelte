<script lang="ts">
	export let type = 'primary';
</script>

<button
	class:primary="{type !== 'secondary'}"
	class:secondary="{type === 'secondary'}"
	on:click
>
	<slot />
</button>

<style>
	button {
		display: inline-block;
		outline: none;
		cursor: pointer;
		border-style: solid;
		border-width: 0.1rem;
		border-radius: 0.3rem;
		padding: 1.2rem 2.4rem;
		line-height: 1.15;
		font-size: 1.6rem;
	}
	.primary {
		color: #ffffff;
		background-color: #373c61;
		border-color: #373c61;
	}

	.primary:hover {
		transition: all 0.1s ease;
		border-color: #9a0202;
	}

	.secondary {
		color: #000000;
		background-color: #ffffff;
		border-color: #373c61;
	}

	.secondary:hover {
		transition: all 0.1s ease;
		border-color: #9a0202;
	}
</style>
