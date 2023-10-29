<script lang="ts">
	import Header from '../../components/header/Header.svelte';
	import Table from '../../components/table/Table.svelte';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: ({ getAllReminders } = data);
	$: reminders = $getAllReminders.data?.reminders?.list;

	const upcoming = [
		{
			id: 1,
			Name: 'Netflix',
			Company: 'Netflix',
			Cost: '£16',
			'Due date': '01.10.23',
			'Auto renewal': true,
		},
	];

	$: ongoing = [
		...(reminders
			? reminders.map((reminder) => {
					return {
						id: reminder.reminder.id,
						'': reminder.reminder.category?.iconId,
						Name: reminder.reminder.name,
						Company: reminder.reminder.company || '',
						'Re-occuring cost': new Intl.NumberFormat('en-GB', {
							style: 'currency',
							currency: 'GBP',
						}).format(reminder.reminder.cost || 0),
						'Total accured': '',
					};
			  })
			: [{}]),
	];
</script>

<Header title="Dashboard" />

<div class="body">
	<section>
		<h2 class="heading-3">
			Total spend this year <span>(Jan '23 - Jan '24)</span>
		</h2>
	</section>

	<section>
		<h2 class="heading-3">Upcoming renewals <span>(3)</span></h2>
		<Table data={upcoming} />
	</section>

	<section>
		<h2 class="heading-3">Ongoing <span>(16)</span></h2>
		<Table data={ongoing} />
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
