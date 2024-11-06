<script lang="ts">
	export let text = '';
</script>

<div class="info">
	<span aria-label="More information">i</span>
	<div class="tooltip">{text}</div>
</div>

<style>
	.info {
		position: relative;
		margin-left: 0.8rem;
	}

	span {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 1.4rem;
		height: 1.4rem;
		background-color: var(--orange);
		color: var(--white);
		border-radius: 50%;
		text-align: center;
		cursor: pointer;
		font-weight: bold;
		font-size: 1.2rem;
	}

	.tooltip {
		display: none;
		background-color: var(--orange);
		color: var(--white);
		border-radius: 0.6rem;
		padding: 0.5rem 0.9rem;
		position: absolute;
		top: -3.9rem;
		left: -0.6rem;
		width: max-content;
	}

	.tooltip::after {
		display: block;
		content: '';
		width: 0;
		height: 0;
		border-left: 0.8rem solid transparent;
		border-right: 0.8rem solid transparent;
		border-top: 0.8rem solid var(--orange);
		position: absolute;
		bottom: -0.7rem;
		left: 0.7rem;
	}

	.info:hover .tooltip {
		display: block;
	}
</style>
