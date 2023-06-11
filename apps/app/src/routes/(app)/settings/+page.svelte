<script lang="ts">
	import {
		getContextClient,
		gql,
		mutationStore,
		queryStore,
	} from '@urql/svelte';
	import { Button } from 'components';

	const client = getContextClient();
	const settings = queryStore({
		client,
		query: gql`
			query getSettings {
				settings: settingsCollection {
					list: edges {
						setting: node {
							id
							first_name
							last_name
							email
						}
					}
				}
			}
		`,
	});

	const updateAccount = (event) => {
		mutationStore({
			client,
			query: gql`
				mutation (
					$id: UUID
					$firstName: String
					$lastName: String
					$email: String
				) {
					updatesettingsCollection(
						filter: { id: { eq: $id } }
						set: { first_name: $firstName, last_name: $lastName, email: $email }
					) {
						affectedCount
						records {
							id
						}
					}
				}
			`,
			variables: {
				firstName: event.target.firstName.value,
				lastName: event.target.lastName.value,
				email: event.target.email.value,
				id: $settings.data.settings.list[0].setting.id,
			},
		}).subscribe((data) => {
			//TODO error handling
			console.log('data', data);
		});
	};
</script>

<h1>Settings</h1>

<section><h2>General</h2></section>

<section>
	<h2>Account</h2>

	{#if $settings.fetching}
		<li>Loading...</li>
	{:else if $settings.error}
		<li>{$settings.error.message}</li>
	{:else}
		<form on:submit="{updateAccount}">
			<label for="email">Email address</label>
			<input
				type="text"
				id="email"
				required
				value="{$settings.data.settings.list[0].setting.email ?? ''}"
			/>

			<label for="firstName">First name</label>
			<input
				type="text"
				id="firstName"
				value="{$settings.data.settings.list[0].setting.first_name ?? ''}"
			/>

			<label for="lastName">Last name</label>
			<input
				type="text"
				id="lastName"
				value="{$settings.data.settings.list[0].setting.last_name ?? ''}"
			/>

			<Button>Update account</Button>
		</form>
	{/if}
</section>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
</style>
