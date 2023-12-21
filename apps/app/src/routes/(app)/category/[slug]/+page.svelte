<script lang="ts">
	import Button from 'components/button/Button.svelte';
	import { page } from '$app/stores';
	import Header from '../../../../components/header/Header.svelte';

	export let data;

	$: ({ getReminders } = data);

	$: upcoming = $getReminders.data?.upcoming?.list || [];
	$: reminders = $getReminders.data?.reminders?.list || [];
	$: pageInfo = $getReminders.data?.reminders?.pageInfo;

	$: upcomingFilter = '1';
	$: numberOfRemindersFilter = '5';

	const onUpcomingChange = async () => {
		const todayDate = new Date();
		const upcomingDate = new Date();
		upcomingDate.setMonth(upcomingDate.getMonth() + parseInt(upcomingFilter));

		await getReminders.fetch({
			variables: {
				today: todayDate,
				upcoming: upcomingDate,
			},
		});
	};

	const onRemindersNumberChange = async () => {
		await getReminders.fetch({
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
			(await getReminders.fetch({
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
			(await getReminders.fetch({
				variables: {
					first: parseInt(numberOfRemindersFilter),
					after: pageInfo.endCursor,
					before: null,
					last: null,
				},
			}));
	};
</script>

<Header
	title={$page.params.slug}
	icon={reminders[0]?.reminder.category?.iconId} />

<div class="body">
	<section>
		<h2 class="heading-3">
			Total {$page.params.slug} spend this year <span>(Jan '23 - Jan '24)</span>
		</h2>
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
							<td data-heading="View" class="view">
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
					<th>View</th>
				</tr>
			</thead>
			<tbody>
				{#if reminders?.length === 0}
					<tr>
						<td colspan="5" class="cell-no-data"
							><p>Add some reminders to get started</p></td>
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
							<td data-heading="Total accured"></td>
							<td data-heading="View" class="view">
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

<svelte:head>
	<title>{$page.params.slug} reminders · remindwise.io</title>
</svelte:head>

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
</style>
