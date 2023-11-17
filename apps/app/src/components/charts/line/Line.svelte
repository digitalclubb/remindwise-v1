<script>
	import { getContext } from 'svelte';

	const { data, xGet, yGet } = getContext('LayerCake');

	export let stroke = 'var(--grey-dark)';

	$: path =
		'M' +
		$data
			.map((d) => {
				return $xGet(d) + ',' + $yGet(d);
			})
			.join('L');
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
