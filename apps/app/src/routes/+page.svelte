<script lang="ts">
	import ChartBar from '../components/charts/bar/Index.svelte';
	import ChartStacked from '../components/charts/stacked/Index.svelte';

	const dummyBarData = [
		{ category: 'insurance', value: 2 },
		{ category: 'entertainment', value: 7 },
		{ category: 'something', value: 5 },
	];

	const dummyStackedData = [
		{
			category: 'insurance',
			reminder1: 3840,
			reminder2: 1920,
			reminder3: 960,
			reminder4: 400,
		},
		{
			category: 'entertainment',
			reminder1: 1600,
			reminder2: 1440,
			reminder3: 960,
			reminder4: 400,
		},
		{
			category: 'something',
			reminder1: 820,
			reminder2: 1000,
			reminder3: 640,
			reminder4: 400,
		},
		{
			category: 'else',
			reminder1: 820,
			reminder2: 560,
			reminder3: 720,
			reminder4: 400,
		},
	];

	/** @type {import('./$types').LayoutData} */
	export let data;
</script>

<h1>Dashboard</h1>

<section>
	<h2>Categories</h2>

	<div>
		<section>
			<h3>Most used</h3>
			<ChartBar data="{dummyBarData}" />
		</section>

		<section>
			<h3>Outgoings</h3>
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
			{#each data.reminders as reminders}
				<tr>
					<td>{reminders.reminder.company}</td>
					<td>{reminders.reminder.categoryId}</td>
					<td>{reminders.reminder.dateOfRenewal}</td>
					<td>{reminders.reminder.autoRenewal}</td>
					<td></td>
					<td></td>
				</tr>
			{/each}
		</tbody>
	</table>
</section>

<style>
	div {
		display: grid;
		padding-left: 4rem;
		padding-right: 4rem;
		grid-template-columns: 1fr 1fr;
		grid-gap: 5rem;
	}
</style>
