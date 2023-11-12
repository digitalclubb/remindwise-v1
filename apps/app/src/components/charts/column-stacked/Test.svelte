<script lang="ts">
	import { LayerCake, ScaledSvg, Html, flatten, uniques } from 'layercake';
	import { stack } from 'd3-shape';
	import { scaleBand, scaleOrdinal } from 'd3-scale';
	import { format, precisionFixed } from 'd3-format';

	import ColumnStacked from './ColumnStacked.svelte';
	import AxisX from './AxisX.svelte';
	import AxisY from './AxisY.svelte';

	const xKey = 'category';
	const yKey = [0, 1];
	const zKey = 'key';

	const data: Record<string, number | string>[] = [
		{
			category: 'Tv',
			apples: 3840,
			bananas: 1920,
		},
		{
			category: 'Music',
			apples: 1600,
			bananas: 1440,
		},
		{
			category: 'Telephone',
			apples: 820,
			bananas: 1000,
		},
		{
			category: 'Insurance',
			apples: 820,
			bananas: 560,
		},
	];

	const seriesNames = Object.keys(data[0]).filter((d) => d !== xKey);
	const seriesColors = ['var(--remindwise-grey)', 'var(--orange)'];

	data.forEach((d) => {
		seriesNames.forEach((name) => {
			d[name] = +d[name];
		});
	});

	const stackData = stack().keys(seriesNames);

	const series = stackData(data);

	const formatTickY = (d) => format(`.${precisionFixed(d)}s`)(d);
</script>

<div class="chart-container">
	<LayerCake
		ssr={true}
		percentRange={true}
		padding={{ top: 0, right: 0, bottom: 20, left: 20 }}
		x={(d) => d.data[xKey]}
		y={yKey}
		z={zKey}
		xScale={scaleBand().paddingInner(0.028).round(true)}
		xDomain={uniques(data, xKey)}
		zScale={scaleOrdinal()}
		zDomain={seriesNames}
		zRange={seriesColors}
		flatData={flatten(series)}
		data={series}>
		<Html>
			<AxisX gridlines={false} />
			<AxisY ticks={4} gridlines={false} formatTick={formatTickY} />
		</Html>
		<ScaledSvg>
			<ColumnStacked />
		</ScaledSvg>
	</LayerCake>
</div>

<style>
	/*
    The wrapper div needs to have an explicit width and height in CSS.
    It can also be a flexbox child or CSS grid element.
    The point being it needs dimensions since the <LayerCake> element will
    expand to fill it.
  */
	.chart-container {
		width: 100%;
		height: 250px;
	}
</style>
