<script lang="ts">
	export let data;
	const table = data.map(({ id, ...actual }) => actual);
	const headings = Object.keys(table[0]);
	const body = Object.values(table);
</script>

<table>
	<thead>
		<tr>
			{#each headings as heading}
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
		{#if data.length === 0}
			<td colspan={headings.length}>
				<p class="no-data">Add some categories and reminders to get started</p>
			</td>
		{/if}
		{#each body as row}
			<tr>
				{#each Object.values(row) as cell}
					<td>{cell}</td>
				{/each}
				<td class="show-info">
					<button class="info">
						<img src="/magnifying-glass.svg" alt="" />
					</button>
				</td>
			</tr>
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

	td {
		background-color: var(--cream-light);
		padding: 1rem 2rem;
		border-top: 1px solid var(--white);
	}

	.show-info {
		text-align: center;
	}

	.not-applicable,
	.no-data {
		color: var(--grey-light);
	}

	.no-data {
		padding-left: 3rem;
	}

	.info {
		all: unset;
		cursor: pointer;
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
