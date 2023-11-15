<script lang="ts">
	import { getContext } from 'svelte';
	import type { LayerCakeContext } from './context';

	const { xScale } = getContext<LayerCakeContext>('LayerCake');

	/* Extend lines from the ticks into the chart space. */
	export let gridlines = true;
	/* Show a vertical mark for each tick. */
	export let tickMarks = false;
	/* Show a solid line at the bottom. */
	export let baseline = false;
	/* Instead of centering the text on the first and the last items, align them to the edges of the chart. */
	export let snapTicks = false;
	/* A function that passes the current tick value and expects a nicely formatted value in return. */
	export let formatTick = (d: string) => d;
	/* If this is a number, it passes that along to the [d3Scale.ticks](https://github.com/d3/d3-scale) function. If this is an array, hardcodes the ticks to those values. If it's a function, passes along the default tick values and expects an array of tick values in return. If nothing, it uses the default ticks supplied by the D3 function. */
	export let ticks: number | [] | ((param: unknown) => void) | undefined =
		undefined;
	/* The distance from the baseline to place each tick value, in pixels. */
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

<div class="axis x-axis" class:snapTicks>
	{#each tickVals as tick, i (tick)}
		{#if gridlines !== false}
			<div class="gridline" style="left:{$xScale(tick)}%;top: 0px;bottom: 0;">
			</div>
		{/if}
		{#if tickMarks === true}
			<div
				class="tick-mark"
				style="left:{$xScale(tick) +
					(isBandwidth
						? $xScale.bandwidth() / 2
						: 0)}%;height:6px;bottom: -6px;">
			</div>
		{/if}
		<div
			class="tick tick-{i}"
			style="left:{$xScale(tick) +
				(isBandwidth ? $xScale.bandwidth() / 2 : 0)}%;top:100%;">
			<div class="text" style="top:{yTick}px;">{formatTick(tick)}</div>
		</div>
	{/each}
	{#if baseline === true}
		<div class="baseline" style="top: 100%;width: 100%;"></div>
	{/if}
</div>

<style>
	.axis,
	.tick,
	.tick-mark,
	.gridline,
	.baseline {
		position: absolute;
	}
	.axis {
		width: 100%;
		height: 100%;
	}

	.gridline {
		border-left: 1px dashed #aaa;
	}

	.tick-mark {
		border-left: 1px solid #aaa;
	}
	.baseline {
		border-top: 1px solid #aaa;
	}

	.tick .text {
		color: #666;
		position: relative;
		white-space: nowrap;
		transform: translateX(-50%);
	}

	.x-axis {
		box-sizing: content-box;
		padding-bottom: 0.3rem;
		border-bottom: 2px solid var(--cream);
		border-left: 2px solid var(--cream);
		font-size: 1.2rem;
		color: var(--remindwise-grey);
	}

	/* This looks a little better at 40 percent than 50 */
	.axis.snapTicks .tick:last-child {
		transform: translateX(-40%);
	}
	.axis.snapTicks .tick.tick-0 {
		transform: translateX(40%);
	}
</style>
