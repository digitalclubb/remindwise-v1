<script lang="ts">
	import { getContext } from 'svelte';
	import type { LayerCakeContext } from '../column-stacked/context';

	const { data, xGet, yGet } = getContext<LayerCakeContext>('LayerCake');

	export let stroke = 'var(--grey-dark)';

	$: path =
		'M' + $data.map((d: unknown) => $xGet(d) + ',' + $yGet(d)).join('L');
</script>

<path class="path-line" d={path} {stroke}></path>

<style>
	.path-line {
		fill: none;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 3;
	}
</style>
