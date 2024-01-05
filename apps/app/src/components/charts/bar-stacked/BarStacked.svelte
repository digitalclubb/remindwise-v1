<script lang="ts">
	import { getContext } from 'svelte';
	import type { LayerCakeContext } from '../column-stacked/context';

	const { data, xGet, yGet, zGet, yScale } =
		getContext<LayerCakeContext>('LayerCake');

	$: columnWidth = (d: string) => {
		const xVals = $xGet(d);
		return xVals[1] - xVals[0];
	};
</script>

<g class="bar-group">
	{#each $data as series}
		{#each series as d, i}
			<rect
				class="group-rect"
				data-id={i}
				x={$xGet(d)[0]}
				y={$yGet(d)}
				height={$yScale.bandwidth()}
				width={columnWidth(d)}
				fill={$zGet(series)}></rect>
		{/each}
	{/each}
</g>
