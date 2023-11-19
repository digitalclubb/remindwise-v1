<script lang="ts">
	import Button from 'components/button/Button.svelte';
	import Header from '../../components/header/Header.svelte';
	import type { PageData } from './$houdini';
	import Test from '../../components/charts/column-stacked/Test.svelte';
	import Donut from '../../components/charts/donut/Test.svelte';
	import Line from '../../components/charts/line/Test.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData & PageData;
	$: ({ getAllReminders, getCategories } = data);

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

		<Test data={barChartData} {iconsMap} />
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
						<td colspan="6"
							><p class="table-no-data">
								No upcoming reminders in the next {upcomingFilter !== '1'
									? upcomingFilter
									: ''}
								{upcomingFilter !== '1' ? 'months' : 'month'}
							</p></td>
					</tr>
				{:else}
					{#each upcoming as reminder}
						<tr>
							<td
								><svg class="table-icon" fill="var(--cream-dark)"
									><use
										xlink:href="#{reminder.reminder.category?.iconId}" /></svg>
								{reminder.reminder.name}</td>
							<td>{reminder.reminder.company}</td>
							<td
								>{new Intl.NumberFormat('en-GB', {
									style: 'currency',
									currency: 'GBP',
								}).format(reminder.reminder.cost || 0)}</td>
							<td>{reminder.reminder.date}</td>
							<td
								>{reminder.reminder.autoRenewal?.valueOf() === undefined
									? '-'
									: reminder.reminder.autoRenewal?.valueOf()
									? 'Yes'
									: 'No'}</td>
							<td>
								<a
									href="/category/{reminder.reminder.category?.name}/{reminder
										.reminder.id}"
									class="table-link">
									<img src="/icon-view.svg" alt="" />
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
						<td
							><p class="table-no-data">
								Add some categories and reminders to get started
							</p></td>
					</tr>
				{:else}
					{#each reminders as reminder}
						<tr>
							<td
								><svg class="table-icon" fill="var(--cream-dark)"
									><use
										xlink:href="#{reminder.reminder.category?.iconId}" /></svg>
								{reminder.reminder.name}</td>
							<td>{reminder.reminder.company}</td>
							<td
								>{new Intl.NumberFormat('en-GB', {
									style: 'currency',
									currency: 'GBP',
								}).format(reminder.reminder.cost || 0)}</td>
							<td></td>
							<td>
								<a
									href="/category/{reminder.reminder.category?.name}/{reminder
										.reminder.id}"
									class="table-link">
									<img src="/icon-view.svg" alt="" />
								</a>
							</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>

		<div class="pagination">
			<Button type="button" style="tertiary" onClick={onPrevious}
				><img
					class="chevron-left"
					src="/icon-chevron.svg"
					alt="" />Previous</Button>
			<Button type="button" style="tertiary" onClick={onNext}
				>Next<img
					class="chevron-right"
					src="/icon-chevron.svg"
					alt="" /></Button>
		</div>
	</section>
</div>

<style>
	.body {
		padding: 2.4rem 4.2rem;
	}

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
	}

	.chevron-left {
		rotate: 90deg;
		margin-right: 1rem;
	}

	.chevron-right {
		rotate: -90deg;
		margin-left: 1rem;
	}

	@media screen and (min-width: 768px) {
		.charts {
			grid-template-areas: 'donut data line';
			grid-template-columns: 0.5fr 1fr 2fr;
		}
	}
</style>
