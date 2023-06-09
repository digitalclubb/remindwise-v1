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
								company
								cost
								dateOfRenewal
								autoRenewal
								reminderTypes
							}
						}
					}
				}`,
				{
					categoryId,
				}
			)
			.toPromise()
			.then((result) => {
				return result.data.reminders.list;
			});
	};

	$: reminders = getReminders();
</script>

<h1>{$page.params.slug}</h1>

<p>reminders:</p>

{#await reminders}
	Loading reminders
{:then reminders}
	{#if reminders.length > 0}
		{#each reminders as reminder}
			{reminder.reminder.company}
		{/each}
	{:else}
		No reminders!!
	{/if}
{:catch error}
	System error: {error.message}.
{/await}
