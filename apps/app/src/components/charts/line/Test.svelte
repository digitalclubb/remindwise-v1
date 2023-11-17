<script>
	import { LayerCake, ScaledSvg, Html } from 'layercake';

	import Line from './Line.svelte';
	import AxisX from './AxisX.svelte';
	import AxisY from './AxisY.svelte';

	import data from './data.js';

	const xKey = 'myX';
	const yKey = 'myY';

	data.forEach((d) => {
		d[yKey] = +d[yKey];
	});
</script>

<div class="chart-container">
	<LayerCake
		ssr={true}
		percentRange={true}
		padding={{ top: 8, right: 10, bottom: 20, left: 25 }}
		x={xKey}
		y={(d) => d[yKey]}
		yNice={4}
		yDomain={[0, null]}
		{data}>
		<Html>
			<AxisX />
			<AxisY ticks={4} />
		</Html>
		<ScaledSvg>
			<Line />
		</ScaledSvg>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 26.5rem;
		padding: 3rem 3rem 3rem 2.5rem;
		background: linear-gradient(180deg, #fff 0%, #f6f6f6 100%);
	}
</style>
