<script lang="ts">
	import Header from '../../components/header/Header.svelte';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: ({ getAllReminders } = data);

	$: upcoming = $getAllReminders.data?.upcoming?.list || [];
	$: reminders = $getAllReminders.data?.reminders?.list || [];

	$: upcomingFilter = '1';

	const onChange = async () => {
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
</script>

<Header title="Dashboard" />

<div class="body">
	<section>
		<h2 class="heading-3">
			Total spend this year <span>(Jan '23 - Jan '24)</span>
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
			<select bind:value={upcomingFilter} on:change={onChange}>
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
		<h2 class="heading-3">
			Active
			{#if reminders}
				<span>({reminders.length})</span>
			{/if}
		</h2>
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

	select {
		background: none;
		border: none;
		font-size: 14px;
		line-height: 38px;
	}
</style>
