<script>
	import { getContext } from 'svelte';

	const { data, xGet, yGet, zGet, xScale } = getContext('LayerCake');

	const isRounded = (color) => (color === 'var(--orange)');
</script>

<g class="column-group">
	{#each [...$data].reverse() as series}
		{#each series as d}
			{@const yVals = $yGet(d)}
			{@const columnHeight = yVals[0] - yVals[1]}

			<path stroke="{$zGet(series)}" stroke-width="8" stroke-linejoin={isRounded($zGet(series)) ? 'round' : undefined} d="M{$xGet(d)},{yVals[1]} h{$xScale.bandwidth()} v{columnHeight} H{$xGet(d)}Z" fill={$zGet(series)} />
		{/each}
	{/each}
</g>

