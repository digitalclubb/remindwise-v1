<script lang="ts">
	import { getContext } from 'svelte';
	import type { LayerCakeContext } from './context';

	const { data, xGet, yGet, zGet, xScale } =
		getContext<LayerCakeContext>('LayerCake');

	// If ongoing and no one off, add rounded corners
	// If one off, add rounded corners
	const isRounded = (colour: string, { data }) => {
		let rounded = undefined;
		if (
			(colour === 'var(--remindwise-grey)' && data.totalSingle === 0) ||
			colour === 'var(--orange)'
		) {
			rounded = 'round';
		}
		return rounded;
	};
</script>

<g class="column-group">
	{#each [...$data].reverse() as series}
		{#each series as d}
			{@const yVals = $yGet(d)}
			{@const columnHeight = yVals[0] - yVals[1]}
			<path
				stroke={$zGet(series)}
				stroke-width="8"
				stroke-linejoin={isRounded($zGet(series), d)}
				d="M{$xGet(
					d
				)},{yVals[1]} h{$xScale.bandwidth()} v{columnHeight} H{$xGet(d)}Z"
				fill={$zGet(series)} />
		{/each}
	{/each}
</g>
