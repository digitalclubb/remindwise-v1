<script lang="ts">
	import { getContext } from 'svelte';
	import type { LayerCakeContext } from '../column-stacked/context';

	const { data, xGet, yGet } = getContext<LayerCakeContext>('LayerCake');

	const month = new Date().getMonth();

	$: path =
		'M' +
		$data
			.slice(0, month + 1)
			.map((d: unknown) => $xGet(d) + ',' + $yGet(d))
			.join('L');

	$: upcoming =
		'M' + $data.map((d: unknown) => $xGet(d) + ',' + $yGet(d)).join('L');
</script>

<path class="path-line upcoming" d={upcoming}></path>
<path class="path-line" d={path}></path>

<style>
	.path-line {
		fill: none;
		stroke: var(--grey-dark);
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 3;
	}

	.upcoming {
		stroke: var(--orange);
	}
</style>
