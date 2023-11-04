<script lang="ts">
	import { page } from '$app/stores';
	import Header from '../../../../components/header/Header.svelte';

	export let data;

	$: ({ getReminders } = data);

	$: upcoming = $getReminders.data?.upcoming?.list || [];
	$: reminders = $getReminders.data?.reminders?.list || [];
</script>

<Header title={$page.params.slug} />

<div class="body">
	<section>
		<h2 class="heading-3">
			Total {$page.params.slug} spend this year <span>(Jan '23 - Jan '24)</span>
		</h2>
	</section>

	<section>
		<h2 class="heading-3">
			Upcoming renewals
			{#if upcoming}
				<span>({upcoming.length})</span>
			{/if}
		</h2>
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
								No upcoming reminders in the next 2 months
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
									<img src="/magnifying-glass.svg" alt="" />
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
			Ongoing
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
						<td colspan="5"
							><p class="table-no-data">
								Add some reminders to get started
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
									<img src="/magnifying-glass.svg" alt="" />
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

	h2 span {
		font-weight: 300;
	}
</style>
