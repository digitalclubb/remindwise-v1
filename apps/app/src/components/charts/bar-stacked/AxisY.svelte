<script lang="ts">
	import { getContext } from 'svelte';
	import type { LayerCakeContext } from './context';

	const { padding, xRange, yScale } = getContext<LayerCakeContext>('LayerCake');

	/** @type {Function} [formatTick=d => d] - A function that passes the current tick value and expects a nicely formatted value in return. */
	export let formatTick = (d) => d;

	/** @type {Number|Array|Function} [ticks=4] - If this is a number, it passes that along to the [d3Scale.ticks](https://github.com/d3/d3-scale) function. If this is an array, hardcodes the ticks to those values. If it's a function, passes along the default tick values and expects an array of tick values in return. */
	export let ticks = 4;

	/** @type {Number} [xTick=-4] - How far over to position the text marker. */
	export let xTick = -4;

	/** @type {Number} [yTick=-1] - How far up and down to position the text marker. */
	export let yTick = -1;

	export let iconsMap: Record<string, string>;

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
	{#each tickVals as tick, i (tick)}
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
				<svg class="table-icon" fill="var(--cream-dark)"
					><use xlink:href="#{iconsMap[tick]}" /></svg>
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

	svg {
		display: block;
		margin-right: 1rem;
	}
</style>
