<script lang="ts">
	import {
		getContextClient,
		gql,
		mutationStore,
		queryStore,
	} from '@urql/svelte';
	import { Button } from 'components';

	import getSettings from '@graphql/queries/getSettings.graphql';
	import updateSettings from '@graphql/mutations/updateSettings.graphql';

	const client = getContextClient();
	const settings = queryStore({
		client,
		query: gql`
			${getSettings}
		`,
	});

	const updateAccount = (event: SubmitEvent) => {
		const formData = new FormData(event.target as HTMLFormElement);

		mutationStore({
			client,
			query: gql`
				${updateSettings}
			`,
			variables: {
				firstName: formData.get('firstName'),
				lastName: formData.get('lastName'),
				email: formData.get('email'),
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
		<form on:submit|preventDefault={updateAccount}>
			<label for="email">Email address</label>
			<input
				type="text"
				id="email"
				required
				value={$settings.data.settings.list[0].setting.email ?? ''}
			/>

			<label for="firstName">First name</label>
			<input
				type="text"
				id="firstName"
				value={$settings.data.settings.list[0].setting.first_name ?? ''}
			/>

			<label for="lastName">Last name</label>
			<input
				type="text"
				id="lastName"
				value={$settings.data.settings.list[0].setting.last_name ?? ''}
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
