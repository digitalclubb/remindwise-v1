<script lang="ts">
	import { getContext } from 'svelte';
	import type { LayerCakeContext } from '../column-stacked/context';

	const { xScale } = getContext<LayerCakeContext>('LayerCake');

	/* If this is a number, it passes that along to the [d3Scale.ticks](https://github.com/d3/d3-scale) function. If this is an array, hardcodes the ticks to those values. If it's a function, passes along the default tick values and expects an array of tick values in return. If nothing, it uses the default ticks supplied by the D3 function. */
	export let ticks: number | [] | ((param: unknown) => void) | undefined =
		undefined;

	export let yTick = 7;

	$: isBandwidth = typeof $xScale.bandwidth === 'function';

	const labels = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
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
			<div class="text" style="top:{yTick}px;">{labels[+tick - 1]}</div>
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
</style>
