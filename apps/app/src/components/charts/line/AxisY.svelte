<script>
	import { getContext } from 'svelte';

	const { padding, xRange, yScale } = getContext('LayerCake');

	export let formatTick = (d) => d;

	export let ticks = 4;

	export let xTick = -4;

	export let yTick = -1;

	$: isBandwidth = typeof $yScale.bandwidth === 'function';

	$: tickVals = Array.isArray(ticks)
		? ticks
		: isBandwidth
		? $yScale.domain()
		: typeof ticks === 'function'
		? ticks($yScale.ticks())
		: $yScale.ticks(ticks);
</script>

<div class="axis y-axis" style="transform:translate(-{$padding.left}px, 0)">
	{#each tickVals as tick}
		<div
			class="tick"
			style="top:{$yScale(tick) +
				(isBandwidth ? $yScale.bandwidth() / 2 : 0)}%;left:{$xRange[0]}%;">
			<div
				class="text"
				style="
          top:{yTick}px;
          left:{isBandwidth ? $padding.left + xTick - 4 : 0}px;
          transform: translate({isBandwidth ? '-100%' : 0}, {isBandwidth
					? -50 - Math.floor($yScale.bandwidth() / -2)
					: '-100'}%);
        ">
				{formatTick(tick)}
			</div>
		</div>
	{/each}
</div>

<style>
	.axis,
	.tick,
	.text {
		position: absolute;
	}
	.axis {
		width: 100%;
		height: 100%;
	}
	.tick {
		font-size: 12px;
		width: 100%;
		font-weight: 100;
	}

	.tick .text {
		color: #666;
	}
</style>
