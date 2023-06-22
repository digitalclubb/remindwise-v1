<script lang="ts">
	import { page } from '$app/stores';
	import { getContextClient } from '@urql/svelte';

	const client = getContextClient();

	$: getCategoryId = async () => {
		return await client
			.query(
				`query ($category: String!) {
					categories: categoriesCollection(
						filter: { name: { eq: $category } }
					) {
						list: edges {
							category: node {
								id
							}
						}
					}
				}`,
				{
					category: $page.params.slug,
				}
			)
			.toPromise()
			.then((result) => {
				return result.data.categories.list[0].category.id;
			});
	};

	$: getReminders = async () => {
		const categoryId = await getCategoryId();

		return await client
			.query(
				`query ($categoryId: String!) {
					reminders: remindersCollection(
						filter: { categoryId: { eq: $categoryId } }
					) {
						list: edges {
							reminder: node {
								id
								company
								cost
								dateOfRenewal
								autoRenewal
								enabled
							}
						}
					}
				}`,
				{
					categoryId,
				},
				{
					requestPolicy: 'cache-and-network',
				}
			)
			.toPromise()
			.then((result) => {
				return {
					list: result.data.reminders.list,
					total: result.data.reminders.list.length,
				};
			});
	};

	$: reminders = getReminders();
</script>

<h1><span>{$page.params.slug}</span> reminders</h1>

{#await reminders}
	<p>Fetching reminders...</p>
{:then reminders}
	<section class="boxes">
		<article class="box">
			<div class="icon">
				<svg><use xlink:href="#bell" /></svg>
			</div>
			<div>
				<h2>No. reminders</h2>
				<p>{reminders.total}</p>
			</div>
		</article>
		<article class="box">
			<div class="icon icon-spent">
				<svg><use xlink:href="#wallet" /></svg>
			</div>
			<div>
				<h2>Total spent</h2>
				<p>£1000</p>
			</div>
		</article>
	</section>

	<h2>Upcoming reminders</h2>

	<ol>
		<li>
			<article class="upcoming">
				<h3>Company</h3>
				<p><span>cost</span> £ 1,000</p>
				<p><span>due in</span> 3 days</p>
			</article>
		</li>
	</ol>

	<h2>All reminders</h2>

	{#if reminders.total > 0}
		<table>
			<thead>
				<tr>
					<th>Company</th>
					<th>Cost</th>
					<th>Renewal date</th>
					<th>Auto renewal</th>
					<th>Reminder enabled</th>
					<th>Notes</th>
					<th>Edit</th>
				</tr>
			</thead>
			<tbody>
				{#each reminders.list as reminder}
					<tr>
						<td>{reminder.reminder.company}</td>
						<td>{reminder.reminder.cost}</td>
						<td>{reminder.reminder.dateOfRenewal}</td>
						<td>{reminder.reminder.autoRenewal}</td>
						<td>{reminder.reminder.enabled}</td>
						<td>View notes</td>
						<td>
							<a href="/reminder/edit/{reminder.reminder.id}"> Edit</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		<p>No reminders found...</p>
	{/if}
{:catch error}
	<p>Error fetching reminders: {error.message}</p>
{/await}

<style>
	h1 span {
		text-transform: capitalize;
	}

	.upcoming {
		display: grid;
		grid-template-columns: 50% 25% 25%;
		width: 50%;
		margin-top: 6rem;
		margin-bottom: 6rem;
	}

	.upcoming h3 {
		font-size: 1.8rem;
	}

	.upcoming p {
		font-size: 1.8rem;
		font-weight: bold;
	}

	.upcoming span {
		display: block;
		font-size: 1.2rem;
		font-weight: normal;
		color: #727272;
	}
	table {
		border-collapse: collapse;
		width: 100%;
		margin-top: 6rem;
	}

	thead {
		font-size: 1.8rem;
		text-align: left;
	}

	th {
		background-color: #cee2ff;
		padding: 2rem;
	}

	td {
		font-size: 1.6rem;
		padding: 2rem;
	}

	tr:nth-child(even) td {
		background-color: #f8fafb;
	}

	/* Below is dupe */
	.boxes {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
		margin-top: 4rem;
		margin-bottom: 4rem;
	}

	.box {
		background-color: #f8fafb;
		padding-top: 3rem;
		padding-bottom: 3rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1.6rem;
	}

	.box h2 {
		font-size: 1.6rem;
		font-weight: normal;
		font-family: 'Roboto';
		margin-bottom: 0;
	}

	.box p {
		font-weight: bold;
		font-size: 2rem;
	}

	.icon {
		background-color: #c7f6d6;
		border-radius: 50%;
		padding: 1rem;
		align-self: center;
	}

	.icon svg {
		width: 2rem;
		height: 2rem;
	}

	.icon-spent {
		background-color: #cee2ff;
	}
</style>
