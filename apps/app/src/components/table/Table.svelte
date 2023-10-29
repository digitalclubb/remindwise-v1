<script lang="ts">
	export let data: Record<string, string | number | boolean>[];

	$: table = data
		? data.map((props) => {
				const newData = { ...props };
				delete newData['id'];
				return newData;
		  })
		: [];
</script>

<table>
	<thead>
		<tr>
			{#each Object.keys(table[0]) as heading}
				<th>
					{heading}
					{#if heading === 'Cost' || heading === 'Re-occuring cost'}
						<span class="alert">!</span>
					{/if}
				</th>
			{/each}
			<th>Info</th>
		</tr>
	</thead>
	<tbody>
		{#if table.length === 1}
			<td colspan={Object.keys(table[0]).length}>
				<p class="no-data">Add some categories and reminders to get started</p>
			</td>
		{/if}
		{#each Object.values(table) as row, index}
			{#if index !== 0}
				<tr>
					{#each Object.values(row) as cell}
						<td>{cell}</td>
					{/each}
					<td class="show-info">
						<a href="/reminder/{data[index].id}" class="info">
							<img src="/magnifying-glass.svg" alt="" />
						</a>
					</td>
				</tr>
			{/if}
		{/each}
	</tbody>
</table>

<style>
	table {
		border-collapse: collapse;
		width: 100%;
	}

	th {
		background-color: var(--cream);
		padding: 1rem 2rem;
		text-align: left;
		font-weight: 500;
	}

	th:first-child {
		padding-left: 5rem;
		border-top-left-radius: 0.6rem;
	}

	th:last-child {
		border-top-right-radius: 0.6rem;
		text-align: center;
	}

	tbody tr {
		position: relative;
	}

	td {
		background-color: var(--cream-light);
		padding: 1rem 2rem;
		border-top: 1px solid var(--white);
	}

	.show-info {
		text-align: center;
	}

	.no-data {
		color: var(--greyed-out);
	}

	.no-data {
		padding-left: 3rem;
	}

	.info::before {
		display: block;
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.info img {
		width: 1.5rem;
		height: 1.5rem;
	}

	th:has(.alert) {
		display: flex;
	}

	.alert {
		background-color: var(--orange);
		border-radius: 50%;
		font-size: 1.2rem;
		color: var(--cream-light);
		width: 1.8rem;
		height: 1.8rem;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 0.6rem;
	}
</style>
