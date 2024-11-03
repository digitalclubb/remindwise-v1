<script lang="ts">
	import { getContext } from 'svelte';
	import type { LayerCakeContext } from '../column-stacked/context';

	const { padding, xRange, yScale } = getContext<LayerCakeContext>('LayerCake');

	/* A function that passes the current tick value and expects a nicely formatted value in return. */
	export let formatTick;
	/* If this is a number, it passes that along to the [d3Scale.ticks](https://github.com/d3/d3-scale) function. If this is an array, hardcodes the ticks to those values. If it's a function, passes along the default tick values and expects an array of tick values in return. If nothing, it uses the default ticks supplied by the D3 function. */
	export let ticks: number | [] | ((param: unknown) => void) | undefined = 4;

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

<div class="y-axis" style="transform:translate(-{$padding.left}px, 0)">
	{#each tickVals as tick}
		<div
			class="tick"
			style="top:{$yScale(tick) +
				(isBandwidth ? $yScale.bandwidth() / 2 : 0)}%;left:{$xRange[0]}%;">
			<div
				class="text"
				style="
          top:{yTick}px;
          left:-10px;
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
	.y-axis,
	.tick,
	.text {
		position: absolute;
	}
	div.y-axis {
		width: 100%;
		height: 100%;
		box-sizing: content-box;
		padding-bottom: 0.3rem;
		font-size: 1.2rem;
		color: var(--remindwise-grey);
		text-transform: capitalize;
		transform: translateX(-4rem);
	}
</style>
