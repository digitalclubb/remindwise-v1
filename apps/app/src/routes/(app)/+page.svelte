<script lang="ts">
	import Button from 'components/button/Button.svelte';
	import Header from '../../components/header/Header.svelte';
	import type { PageData } from './$houdini';
	import Bar from '../../components/charts/column-stacked/Index.svelte';
	import Donut from '../../components/charts/donut/Index.svelte';
	import Line from '../../components/charts/line/Index.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData & PageData;
	$: ({ getAllReminders, getCategories, getHistorical } = data);

	$: console.log($getHistorical.data?.historical?.list[0].historical);

	$: upcoming = $getAllReminders.data?.upcoming?.list || [];
	$: reminders = $getAllReminders.data?.reminders?.list || [];
	$: pageInfo = $getAllReminders.data?.reminders?.pageInfo;
	let barChartData: Record<string, number | string>[] = [];
	let iconsMap: Record<string, string> = {};
	$: for (const category of $getCategories.data?.categories?.list || []) {
		let totalOngoing = 0;
		let totalSingle = 0;
		category.category.reminders?.list.forEach((reminder) => {
			if (reminder.reminder.type === 'ONGOING') {
				totalOngoing += reminder.reminder.cost;
			} else {
				totalSingle += reminder.reminder.cost;
			}
		});
		barChartData.push({
			category: category.category.name,
			totalOngoing: totalOngoing,
			totalSingle: totalSingle,
		});

		iconsMap[category.category.name] = category.category.iconId || '';
	}

	$: upcomingFilter = '1';
	$: numberOfRemindersFilter = '5';

	const onUpcomingChange = async () => {
		const todayDate = new Date();
		const upcomingDate = new Date();
		upcomingDate.setMonth(upcomingDate.getMonth() + parseInt(upcomingFilter));

		await getAllReminders.fetch({
			variables: {
				today: todayDate,
				upcoming: upcomingDate,
			},
		});
	};

	const onRemindersNumberChange = async () => {
		await getAllReminders.fetch({
			variables: {
				first: parseInt(numberOfRemindersFilter),
				last: null,
				before: null,
				after: null,
			},
		});
	};

	const onPrevious = async () => {
		pageInfo?.hasPreviousPage &&
			(await getAllReminders.fetch({
				variables: {
					last: parseInt(numberOfRemindersFilter),
					before: pageInfo.startCursor,
					first: null,
					after: null,
				},
			}));
	};

	const onNext = async () => {
		pageInfo?.hasNextPage &&
			(await getAllReminders.fetch({
				variables: {
					first: parseInt(numberOfRemindersFilter),
					after: pageInfo.endCursor,
					before: null,
					last: null,
				},
			}));
	};
</script>

<svelte:head>
	<title>Dashboard · remindwise.io</title>
</svelte:head>

<Header title="Dashboard" />

<div class="body">
	<section>
		<h2 class="heading-3">
			Total spend this year <span>(Jan '23 - Jan '24)</span>
		</h2>

		<div class="charts">
			<div class="donut">
				<Donut />
			</div>
			<div class="costs-data">
				<ul class="costs">
					<li class="cost">
						<h3 class="heading-5">Spent so far</h3>
						<p>£560</p>
					</li>
					<li class="cost cost-upcoming">
						<h3 class="heading-5">Upcoming</h3>
						<p>£560</p>
					</li>
				</ul>
				<div class="costs cost-upcoming">
					<h4>Upcoming costs</h4>
					<div class="cost-switcher">
						<select>
							<option value="1">1 months</option>
							<option value="3">3 months</option>
							<option value="6">6 months</option>
						</select>
						<p>£450</p>
					</div>
				</div>
			</div>
			<div class="line">
				<Line />
			</div>
		</div>

		<Bar data={barChartData} {iconsMap} />
	</section>

	<section>
		<div class="header">
			<h2 class="heading-3">
				Upcoming renewals
				{#if upcoming}
					<span>({upcoming.length})</span>
				{/if}
			</h2>
			<select bind:value={upcomingFilter} on:change={onUpcomingChange}>
				<option value="1">1 months</option>
				<option value="3">3 months</option>
				<option value="6">6 months</option>
			</select>
		</div>
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Company</th>
					<th>Cost</th>
					<th>Due date</th>
					<th>Auto renewal</th>
					<th>Info</th>
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
										xlink:href="#{reminder.reminder.category?.iconId}" /></svg
								></td>
							<td data-heading="Company">{reminder.reminder.company}</td>
							<td data-heading="Cost"
								>{new Intl.NumberFormat('en-GB', {
									style: 'currency',
									currency: 'GBP',
								}).format(reminder.reminder.cost || 0)}</td>
							<td data-heading="Due date">{reminder.reminder.date}</td>
							<td data-heading="Auto renewal"
								>{reminder.reminder.autoRenewal?.valueOf() === undefined
									? '-'
									: reminder.reminder.autoRenewal?.valueOf()
										? 'Yes'
										: 'No'}</td>
							<td data-heading="Info" class="view">
								<a
									href="/category/{reminder.reminder.category?.name}/{reminder
										.reminder.id}"
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
					<th>Company</th>
					<th>Re-occuring cost</th>
					<th>Total accured</th>
					<th>Info</th>
				</tr>
			</thead>
			<tbody>
				{#if reminders?.length === 0}
					<tr>
						<td class="cell-no-data"
							><p>Add some categories and reminders to get started</p></td>
					</tr>
				{:else}
					{#each reminders as reminder}
						<tr>
							<td data-heading="Name" class="name">
								{reminder.reminder.name}
								<svg class="table-icon" fill="var(--cream-dark)"
									><use
										xlink:href="#{reminder.reminder.category?.iconId}" /></svg
								></td>
							<td data-heading="Company">{reminder.reminder.company}</td>
							<td data-heading="Re-occuring cost"
								>{new Intl.NumberFormat('en-GB', {
									style: 'currency',
									currency: 'GBP',
								}).format(reminder.reminder.cost || 0)}</td>
							<td data-heading="Total accured"
								>{new Intl.NumberFormat('en-GB', {
									style: 'currency',
									currency: 'GBP',
								}).format(reminder.reminder.total || 0)}</td>
							<td data-heading="Info" class="view">
								<a
									href="/category/{reminder.reminder.category?.name}/{reminder
										.reminder.id}"
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

	@media screen and (min-width: 1280px) {
		.charts {
			grid-template-areas: 'donut data line';
			grid-template-columns: 0.5fr 1fr 2fr;
		}
	}
</style>
