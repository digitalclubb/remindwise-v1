<script lang="ts">
	import { Button } from 'components';

	export let data;

	$: ({ getSettings } = data);
	$: settings = $getSettings.data?.settings?.list[0].setting;

	const updateAccount = (event: SubmitEvent) => {
		const formData = new FormData(event.target as HTMLFormElement);

		// mutationStore<UpdateSettingsMutation, UpdateSettingsMutationVariables>({
		// 	client,
		// 	query: gql`
		// 		${updateSettings}
		// 	`,
		// 	variables: {
		// 		firstName: formData.get('firstName')?.toString(),
		// 		lastName: formData.get('lastName')?.toString(),
		// 		email: formData.get('email')?.toString(),
		// 		id: $settings.data?.settings?.list[0].setting.id,
		// 	},
		// }).subscribe((data) => {
		// 	//TODO error handling
		// 	console.log('data', data);
		// });
	};
</script>

<h1>Settings</h1>

<section><h2>General</h2></section>

<section>
	<h2>Account</h2>

	{#if $getSettings.fetching}
		<li>Loading...</li>
	{:else if $getSettings.errors}
		<li>{$getSettings.errors}</li>
	{:else if settings}
		<form on:submit|preventDefault={updateAccount}>
			<label for="email">Email address</label>
			<input type="text" id="email" required value={settings.email ?? ''} />

			<label for="firstName">First name</label>
			<input type="text" id="firstName" value={settings.first_name ?? ''} />

			<label for="lastName">Last name</label>
			<input type="text" id="lastName" value={settings.last_name ?? ''} />

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
