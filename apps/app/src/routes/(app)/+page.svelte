<script lang="ts">
	import ChartBar from '../../components/charts/bar/Index.svelte';
	import ChartStacked from '../../components/charts/stacked/Index.svelte';

	const dummyBarData = [
		{ category: 'insurance', value: 2 },
		{ category: 'entertainment', value: 7 },
		{ category: 'something', value: 5 },
	];

	const dummyStackedData = [
		{
			category: 1,
			reminder1: 3840,
			reminder2: 1920,
			reminder3: 960,
			reminder4: 400,
		},
		{
			category: 2,
			reminder1: 1600,
			reminder2: 1440,
			reminder3: 960,
			reminder4: 400,
		},
		{
			category: 3,
			reminder1: 820,
			reminder2: 1000,
			reminder3: 640,
			reminder4: 400,
		},
		{
			category: 4,
			reminder1: 820,
			reminder2: 560,
			reminder3: 720,
			reminder4: 400,
		},
	];
</script>

<h1>Reminders</h1>

<section class="boxes">
	<article class="box">
		<div class="icon">
			<svg><use xlink:href="#bell"></use></svg>
		</div>
		<div>
			<h2>No. reminders</h2>
			<p>10</p>
		</div>
	</article>
	<article class="box">
		<div class="icon icon-categories">
			<svg><use xlink:href="#archive"></use></svg>
		</div>
		<div>
			<h2>No. categories</h2>
			<p>10</p>
		</div>
	</article>
	<article class="box">
		<div class="icon icon-spent">
			<svg><use xlink:href="#wallet"></use></svg>
		</div>
		<div>
			<h2>Total spent</h2>
			<p>£1000</p>
		</div>
	</article>
</section>

<section>
	<div class="charts">
		<section>
			<h3>Most used categories</h3>
			<ChartBar data="{dummyBarData}" />
		</section>

		<section>
			<h3>Total spent by category</h3>
			<ChartStacked data="{dummyStackedData}" />
		</section>
	</div>
</section>

<section>
	<h2>Upcoming reminders</h2>
	<table>
		<thead>
			<tr>
				<th>Company</th>
				<th>Category</th>
				<th>Due date</th>
				<th>Auto renewal?</th>
				<th>Telephone</th>
				<th>Email</th>
			</tr>
		</thead>
		<tbody>
			<!-- {#each data.reminders as reminders}
				<tr>
					<td>{reminders.reminder.company}</td>
					<td>{reminders.reminder.categoryId}</td>
					<td>{reminders.reminder.dateOfRenewal}</td>
					<td>{reminders.reminder.autoRenewal}</td>
					<td></td>
					<td></td>
				</tr>
			{/each} -->
		</tbody>
	</table>
</section>

<style>
	.charts {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 5rem;
	}

	.boxes {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
		margin-top: 4rem;
		margin-bottom: 4rem;
	}

	.box {
		background-color: #f8fafb;
		padding-top: 3rem;
		padding-bottom: 3rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1.6rem;
	}

	.box h2 {
		font-size: 1.6rem;
		font-weight: normal;
		font-family: 'Roboto';
		margin-bottom: 0;
	}

	.box p {
		font-weight: bold;
		font-size: 2rem;
	}

	.icon {
		background-color: #c7f6d6;
		border-radius: 50%;
		padding: 1rem;
		align-self: center;
	}

	.icon svg {
		width: 2rem;
		height: 2rem;
	}

	.icon-categories {
		background-color: #fcd6f1;
	}

	.icon-spent {
		background-color: #cee2ff;
	}
</style>
