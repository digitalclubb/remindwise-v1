<script lang="ts">
	import Button from '../../components/button/Button.svelte';
	import Header from '../../components/header/Header.svelte';
	import type { PageData } from './$houdini';
	import Bar from '../../components/charts/bar-stacked/Index.svelte';
	import Column from '../../components/charts/column-stacked/Index.svelte';
	import Donut from '../../components/charts/donut/Index.svelte';
	import Line from '../../components/charts/line/Index.svelte';
	import type { LayoutData } from './$types';
	import { getCurrency } from '../../utils/currency';

	export let data: LayoutData & PageData;
	$: ({ GetReminders, GetCategories, GetSettings, graphData } = data);

	$: upcoming = $GetReminders.data?.upcoming?.list || [];
	$: reminders = $GetReminders.data?.reminders?.list || [];
	$: pageInfo = $GetReminders.data?.reminders?.pageInfo;

	$: currency = $GetSettings.data?.settings?.list[0].setting.currency || '';
	$: currencySymbol = getCurrency(currency);

	let barChartData: Record<string, number | string>[] = [];
	let iconsMap: Record<string, string> = {};

	const currentMonth = new Date().getMonth() + 1;
	const currentYear = new Date().getFullYear();

	let totalSpentSoFar = 0,
		totalUpcoming = 0;

	let filteredUpcomingCosts = 0;
	$: graphData?.totalMonthCosts.forEach((value, key) => {
		if (parseInt(key) > currentMonth) {
			totalUpcoming += value;
		} else {
			totalSpentSoFar += value;
		}

		if (parseInt(key) === currentMonth + 1) {
			filteredUpcomingCosts = value;
		}
	});

	$: for (const category of $GetCategories.data?.categories?.list || []) {
		const categoryResults = graphData?.perCategoryCosts.get(
			category.category.id
		);
		let spentSoFar = 0;
		let upcoming = 0;
		categoryResults?.forEach((value, key) => {
			if (parseInt(key) > currentMonth) {
				upcoming += value;
			} else {
				spentSoFar += value;
			}
		});

		barChartData.push({
			category: category.category.name,
			spentSoFar,
			upcoming,
		});

		iconsMap[category.category.name] = category.category.icon_id || '';
	}

	const lineGraphData: { month: string; total: number }[] = [];

	$: graphData?.totalMonthCosts.forEach((value: number, key: string) => {
		lineGraphData.push({
			month: key,
			total: value,
		});
	});

	$: upcomingFilter = '1';
	$: numberOfRemindersFilter = '5';

	const onUpcomingChange = async () => {
		await GetReminders.fetch();
	};

	const onRemindersNumberChange = async () => {
		await GetReminders.fetch({
			variables: {
				first: parseInt(numberOfRemindersFilter),
				last: null,
				before: null,
				after: null,
			},
		});
	};

	const onPrevious = async () => {
		if (pageInfo?.hasPreviousPage) {
			await GetReminders.fetch({
				variables: {
					last: parseInt(numberOfRemindersFilter),
					before: pageInfo.startCursor,
					first: null,
					after: null,
				},
			});
		}
	};

	const onNext = async () => {
		if (pageInfo?.hasNextPage) {
			await GetReminders.fetch({
				variables: {
					first: parseInt(numberOfRemindersFilter),
					after: pageInfo.endCursor,
					before: null,
					last: null,
				},
			});
		}
	};
</script>

<svelte:head>
	<title>Dashboard · remindwise.io</title>
</svelte:head>

<Header title="Dashboard" />

<div class="body">
	<section>
		<h2 class="heading-3">
			Total spend this year <span
				>(Jan {currentYear} - Jan {currentYear + 1})</span>
		</h2>

		<div class="charts">
			<div class="donut">
				<Donut spentSoFar={totalSpentSoFar} upcoming={totalUpcoming} />
			</div>
			<div class="costs-data">
				<ul class="costs">
					<li class="cost">
						<h3 class="heading-5">Spent so far</h3>
						<p>{currencySymbol}{totalSpentSoFar}</p>
					</li>
					<li class="cost cost-upcoming">
						<h3 class="heading-5">Upcoming</h3>
						<p>{currencySymbol}{totalUpcoming}</p>
					</li>
				</ul>
				<div class="costs cost-upcoming">
					<h4>Upcoming costs</h4>
					<div class="cost-switcher">
						<select aria-label="Filter upcoming costs">
							<option value="1">1 months</option>
							<option value="3">3 months</option>
							<option value="6">6 months</option>
						</select>
						<p>{currencySymbol}{filteredUpcomingCosts}</p>
					</div>
				</div>
			</div>
			<div class="line">
				<Line data={lineGraphData} />
			</div>
		</div>

		<div class="chart-column">
			<Column data={barChartData} {iconsMap} />
		</div>
		<div class="chart-bar">
			<Bar data={barChartData} {iconsMap} />
		</div>
	</section>

	<section>
		<div class="header">
			<h2 class="heading-3">
				Upcoming renewals
				{#if upcoming}
					<span>({upcoming.length})</span>
				{/if}
			</h2>
			<select
				aria-label="Filter upcoming renewals"
				bind:value={upcomingFilter}
				on:change={onUpcomingChange}>
				<option value="1">1 months</option>
				<option value="3">3 months</option>
				<option value="6">6 months</option>
			</select>
		</div>
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Cost</th>
					<th>Due date</th>
					<th>Auto renewal</th>
					<th>View</th>
				</tr>
			</thead>
			<tbody>
				{#if upcoming?.length === 0}
					<tr>
						<td colspan="6" class="cell-no-data"
							><p>
								No upcoming reminders in the next {upcomingFilter !== '1'
									? upcomingFilter
									: ''}
								{upcomingFilter !== '1' ? 'months' : 'month'}
							</p></td>
					</tr>
				{:else}
					{#each upcoming as reminder}
						<tr>
							<td data-heading="Name" class="name">
								{reminder.reminder.name}
								<svg class="table-icon" fill="var(--cream-dark)"
									><use
										xlink:href="#{reminder.reminder.category?.icon_id}" /></svg
								></td>
							<td data-heading="Cost"
								>{new Intl.NumberFormat('en-GB', {
									style: 'currency',
									currency: currency || undefined,
									currencyDisplay: 'narrowSymbol',
								}).format(reminder.reminder.cost || 0)}</td>
							<td data-heading="Due date"
								>{reminder.reminder.day} of {reminder.reminder.month}</td>
							<td data-heading="Auto renewal"
								>{reminder.reminder.auto_renewal?.valueOf() === undefined
									? '-'
									: reminder.reminder.auto_renewal?.valueOf()
										? 'Yes'
										: 'No'}</td>
							<td data-heading="View" class="view">
								<a
									href="/category/{reminder.reminder.category?.name}/{reminder
										.reminder.id}"
									aria-label={`View ${reminder.reminder.name}`}
									class="table-link">
									<svg>
										<use xlink:href="#icon-view"></use>
									</svg>
								</a>
							</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</section>

	<section>
		<div class="header">
			<h2 class="heading-3">
				Active
				{#if reminders}
					<span>({reminders.length})</span>
				{/if}
			</h2>
			<select
				aria-label="Filter active reminders"
				bind:value={numberOfRemindersFilter}
				on:change={onRemindersNumberChange}>
				<option value="5">show 5</option>
				<option value="10">show 10</option>
				<option value="15">show 15</option>
			</select>
		</div>
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Re-occuring cost</th>
					<th>Total accured</th>
					<th>View</th>
				</tr>
			</thead>
			<tbody>
				{#if reminders?.length === 0}
					<tr>
						<td class="cell-no-data" colspan="5"
							><p>Add some categories and reminders to get started</p></td>
					</tr>
				{:else}
					{#each reminders as reminder}
						<tr>
							<td data-heading="Name" class="name">
								{reminder.reminder.name}
								<svg class="table-icon" fill="var(--cream-dark)"
									><use
										xlink:href="#{reminder.reminder.category?.icon_id}" /></svg
								></td>
							<td data-heading="Re-occuring cost"
								>{new Intl.NumberFormat('en-GB', {
									style: 'currency',
									currency: currency || undefined,
									currencyDisplay: 'narrowSymbol',
								}).format(reminder.reminder.cost || 0)}</td>
							<td data-heading="Total accured"
								>{new Intl.NumberFormat('en-GB', {
									style: 'currency',
									currency: currency || undefined,
									currencyDisplay: 'narrowSymbol',
								}).format(0)}</td>
							<td data-heading="View" class="view">
								<a
									href="/category/{reminder.reminder.category?.name}/{reminder
										.reminder.id}"
									class="table-link"
									aria-label={`View reminder ${reminder.reminder.category?.name}`}>
									<svg aria-hidden="true">
										<use xlink:href="#icon-view"></use>
									</svg>
								</a>
							</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>

		<div class="pagination">
			<Button type="button" style="tertiary" onClick={onPrevious}
				><svg class="chevron-left">
					<use xlink:href="#icon-chevron"></use>
				</svg> Previous</Button>
			<Button type="button" style="tertiary" onClick={onNext}
				>Next <svg class="chevron-right">
					<use xlink:href="#icon-chevron"></use>
				</svg></Button>
		</div>
	</section>
</div>

<style>
	section {
		margin-bottom: 3rem;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	h2 span {
		font-weight: 300;
	}

	.costs {
		border: 1px solid var(--cream);
		border-radius: 0.6rem;
		padding: 2rem;
	}

	ul.costs {
		margin-bottom: 1.2rem;
	}

	.cost {
		display: flex;
		justify-content: space-between;
		align-items: first baseline;
	}

	.costs p {
		font-size: 1.6rem;
	}

	.cost-upcoming p {
		color: var(--orange);
	}

	.cost h3::before {
		content: '';
		display: inline-block;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: var(--remindwise-grey);
		margin-right: 1rem;
	}

	.cost-upcoming h3::before {
		background-color: var(--orange);
	}

	.cost-switcher {
		display: flex;
		justify-content: space-between;
	}

	select {
		background: none;
		border: none;
		font-size: 14px;
		line-height: 38px;
	}

	.pagination {
		display: flex;
		justify-content: flex-end;
		margin-top: 2rem;
		gap: 2rem;
	}

	.chevron-left,
	.chevron-right {
		display: inline-block;
		width: 1.4rem;
		height: 1.4rem;
	}

	.chevron-left {
		rotate: 90deg;
		margin-right: 1rem;
	}

	.chevron-right {
		rotate: -90deg;
		margin-left: 1rem;
	}

	.chart-column {
		display: none;
	}

	@media screen and (min-width: 500px) {
		.charts {
			display: grid;
			grid-template-columns: 0.5fr 1fr;
			grid-template-areas:
				'donut data'
				'line line';
			gap: 4.8rem;
			margin-bottom: 2rem;
			align-items: center;
			justify-items: center;
		}

		.donut {
			grid-area: donut;
		}

		.costs-data {
			grid-area: data;
			justify-self: stretch;
		}

		.line {
			grid-area: line;
			width: 100%;
		}
	}

	@media screen and (min-width: 1024px) {
		.chart-column {
			display: block;
		}

		.chart-bar {
			display: none;
		}
	}

	@media screen and (min-width: 1280px) {
		.charts {
			grid-template-areas: 'donut data line';
			grid-template-columns: 0.5fr 1fr 2fr;
		}
	}
</style>
