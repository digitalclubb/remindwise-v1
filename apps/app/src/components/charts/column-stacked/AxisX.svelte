<script lang="ts">
	import { getContext } from 'svelte';
	import type { LayerCakeContext } from './context';

	const { xScale } = getContext<LayerCakeContext>('LayerCake');

	/* A function that passes the current tick value and expects a nicely formatted value in return. */
	export let formatTick = (d: string) => d;
	/* If this is a number, it passes that along to the [d3Scale.ticks](https://github.com/d3/d3-scale) function. If this is an array, hardcodes the ticks to those values. If it's a function, passes along the default tick values and expects an array of tick values in return. If nothing, it uses the default ticks supplied by the D3 function. */
	export let ticks: number | [] | ((param: unknown) => void) | undefined =
		undefined;
	/* The distance from the baseline to place each tick value, in pixels. */
	export let yTick = 7;

	export let iconsMap: Record<string, string>;

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
	{#each tickVals as tick, i (tick)}
		<div
			class="ticks"
			style="left:{$xScale(tick) +
				(isBandwidth ? $xScale.bandwidth() / 2 : 0)}%;top:100%;">
			<div class="text" style="top:{yTick}px;">
				{formatTick(tick)}
				<svg class="table-icon" fill="var(--cream-dark)"
					><use xlink:href="#{iconsMap[tick]}" /></svg>
			</div>
		</div>
	{/each}
</div>

<style>
	.x-axis,
	.ticks {
		position: absolute;
	}

	.text {
		position: relative;
		white-space: nowrap;
		transform: translateX(-50%);
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

	svg {
		display: block;
		margin: 1rem auto 0;
	}
</style>
