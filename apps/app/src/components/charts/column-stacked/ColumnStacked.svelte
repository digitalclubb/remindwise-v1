<script>
	import { getContext } from 'svelte';

	const { data, xGet, yGet, zGet, xScale } = getContext('LayerCake');
</script>

<g class="column-group">
	{#each $data as series}
		{#each series as d}
			{@const yVals = $yGet(d)}
			{@const columnHeight = yVals[0] - yVals[1]}

			<path stroke="{$zGet(series)}" stroke-width="8" stroke-linejoin="round" d="M{$xGet(d)},{yVals[1]} h{$xScale.bandwidth()} v{columnHeight} H{$xGet(d)}Z" fill={$zGet(series)} />
		{/each}
	{/each}
</g>
