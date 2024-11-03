<script lang="ts">
	import { LayerCake, ScaledSvg, Html } from 'layercake';
	import { formatLocale } from 'd3-format';

	import Line from './Line.svelte';
	import AxisX from './AxisX.svelte';
	import AxisY from './AxisY.svelte';

	export let data;

	const xKey = 'month';
	const yKey = 'total';

	data.forEach((d: Record<string, string | number>) => {
		d[yKey] = +d[yKey];
	});

	const y = (d: Record<string, string | number>) => d[yKey];

	const gbp = formatLocale({
		decimal: '.',
		thousands: ',',
		grouping: [],
		currency: ['£', ''],
	});
	const formatTickY = (d: number) => gbp.format('$~s')(d);
</script>

<div class="chart-container">
	{#if data.length > 0}
		<LayerCake
			ssr={true}
			percentRange={true}
			padding={{ top: 8, right: 10, bottom: 20, left: 25 }}
			x={xKey}
			{y}
			yNice={4}
			xDomain={[1, 12]}
			yDomain={[0, null]}
			{data}>
			<Html>
				<AxisX />
				<AxisY ticks={4} formatTick={formatTickY} />
			</Html>
			<ScaledSvg>
				<Line />
			</ScaledSvg>
		</LayerCake>
	{/if}
</div>

<style>
	.chart-container {
		width: 100%;
		height: 26.5rem;
		padding: 3rem 3rem 3rem 2.5rem;
		background: linear-gradient(180deg, #fff 0%, #f6f6f6 100%);
	}
</style>
