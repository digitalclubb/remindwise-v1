<script lang="ts">
	import { getContext } from 'svelte';
	import type { LayerCakeContext } from '../layercake-context';

	const { data, xGet, yGet, xScale, yScale } =
		getContext<LayerCakeContext>('LayerCake');

	export let fill = '#00bbff';
</script>

<g class="bar-group">
	{#each $data as d, i}
		<rect
			class="group-rect"
			data-id={i}
			x={$xScale.range()[0]}
			y={$yGet(d)}
			height={$yScale.bandwidth()}
			width={$xGet(d)}
			{fill}
		/>
	{/each}
</g>
