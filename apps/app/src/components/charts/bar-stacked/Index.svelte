<script lang="ts">
	import { LayerCake, ScaledSvg, Html, flatten, uniques } from 'layercake';
	import { stack } from 'd3-shape';
	import { scaleBand, scaleOrdinal } from 'd3-scale';
	import { formatLocale } from 'd3-format';

	import BarStacked from './BarStacked.svelte';
	import AxisX from './AxisX.svelte';
	import AxisY from './AxisY.svelte';

	export let data: Record<string, number | string>[];
	export let iconsMap: Record<string, string>;

	const xKey = 'category';
	const yKey = [0, 1];
	const zKey = 'key';

	const seriesNames = Object.keys(data[0]).filter((d) => d !== xKey);
	const seriesColors = ['var(--remindwise-grey)', 'var(--orange)'];

	data.forEach((d) => {
		seriesNames.forEach((name) => {
			d[name] = +d[name];
		});
	});

	const stackData = stack().keys(seriesNames);

	const series = stackData(data);

	/* eslint-disable  @typescript-eslint/no-explicit-any */
	const yHandle = (d: { data: { [x: string]: any } }) => d.data[xKey];

	const gbp = formatLocale({
		decimal: '.',
		thousands: ',',
		grouping: [],
		currency: ['£', ''],
	});
	const formatTickX = (d: number) => gbp.format('$~s')(d);
</script>

<div class="chart-container">
	<LayerCake
		ssr={true}
		percentRange={true}
		padding={{ top: 0, right: 0, bottom: 20, left: 20 }}
		y={yHandle}
		x={yKey}
		z={zKey}
		yScale={scaleBand().paddingInner(0.4).round(true)}
		yDomain={uniques(data, xKey)}
		zScale={scaleOrdinal()}
		zDomain={seriesNames}
		zRange={seriesColors}
		flatData={flatten(series)}
		data={series}>
		<Html>
			<AxisX ticks={4} formatTick={formatTickX} />
			<AxisY {iconsMap} />
		</Html>
		<ScaledSvg>
			<BarStacked />
		</ScaledSvg>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 30rem;
		padding: 2rem 2rem 4rem 4rem;
		background: linear-gradient(180deg, #fff 0%, #f6f6f6 100%);
	}
</style>
