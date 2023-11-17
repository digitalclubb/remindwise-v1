<script>
	import { getContext } from 'svelte';

	const { xScale } = getContext('LayerCake');

	export let formatTick = (d) => d;

	export let ticks = undefined;

	export let yTick = 7;

	$: isBandwidth = typeof $xScale.bandwidth === 'function';

	$: tickVals = Array.isArray(ticks)
		? ticks
		: isBandwidth
		? $xScale.domain()
		: typeof ticks === 'function'
		? ticks($xScale.ticks())
		: $xScale.ticks(ticks);
</script>

<div class="x-axis">
	{#each tickVals as tick}
		<div
			class="tick"
			style="left:{$xScale(tick) +
				(isBandwidth ? $xScale.bandwidth() / 2 : 0)}%;top:100%;">
			<div class="text" style="top:{yTick}px;">{formatTick(tick)}</div>
		</div>
	{/each}
</div>

<style>
	.x-axis,
	.tick {
		position: absolute;
	}

	div.x-axis {
		width: 100%;
		height: 100%;
		box-sizing: content-box;
		padding-bottom: 0.3rem;
		border-bottom: 2px solid var(--cream);
		border-left: 2px solid var(--cream);
		font-size: 1.2rem;
		color: var(--remindwise-grey);
		text-transform: capitalize;
	}

	.tick {
		font-size: 0.725em;
		font-weight: 200;
	}

	.tick .text {
		color: #666;
		position: relative;
		white-space: nowrap;
		transform: translateX(-50%);
	}
</style>
