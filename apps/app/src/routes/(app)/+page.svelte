<script lang="ts">
	import Header from '../../components/header/Header.svelte';
	import Table from '../../components/table/Table.svelte';

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

	const ongoing = [
		{
			id: '',
			Name: '',
			Company: '',
			'Re-occuring cost': '',
			'Total accured': '',
		},
		{
			id: 1,
			Name: 'Netflix',
			Company: 'Netflix',
			'Re-occuring cost': '£12',
			'Total accured': '£1,332',
		},
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
