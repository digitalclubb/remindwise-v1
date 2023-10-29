<script lang="ts">
	import { page } from '$app/stores';
	import Header from '../../../../components/header/Header.svelte';
	import Table from '../../../../components/table/Table.svelte';

	export let data;

	$: ({ getReminders } = data);

	$: reminders = $getReminders.data?.reminders?.list;

	const upcoming = [
		{
			id: '',
			Name: '',
			Company: '',
			Cost: '',
			'Due date': '',
			'Auto renewal': '',
		},
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
		{
			id: '',
			Name: '',
			Company: '',
			'Re-occuring cost': '',
			'Total accured': '',
		},
		...(reminders
			? reminders.map((reminder) => {
					return {
						id: reminder.reminder.id,
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

<Header title={$page.params.slug} />

<div class="body">
	<section>
		<h2 class="heading-3">
			Total {$page.params.slug} spend this year <span>(Jan '23 - Jan '24)</span>
		</h2>
	</section>

	<section>
		<h2 class="heading-3">Upcoming renewals <span>(3)</span></h2>
		<Table data={upcoming} />
	</section>

	<section>
		<h2 class="heading-3">Ongoing <span>({reminders?.length})</span></h2>
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
