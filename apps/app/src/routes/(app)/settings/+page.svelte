<script lang="ts">
	import { Button } from 'components';

	export let data;

	$: ({ getSettings } = data);
	$: settings = $getSettings.data?.settings?.list[0].setting;
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
		<form method="POST" action="?/updateSettings">
			<input type="hidden" id="id" name="id" value={settings.id ?? ''} />

			<label for="email">Email address</label>
			<input
				type="text"
				id="email"
				name="email"
				required
				value={settings.email ?? ''} />

			<label for="firstName">First name</label>
			<input
				type="text"
				id="firstName"
				name="firstName"
				value={settings.first_name ?? ''} />

			<label for="lastName">Last name</label>
			<input
				type="text"
				id="lastName"
				name="lastName"
				value={settings.last_name ?? ''} />

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
