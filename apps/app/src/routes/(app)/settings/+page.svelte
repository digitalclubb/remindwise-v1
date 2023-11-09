<script lang="ts">
	import { Button } from 'components';
	import Header from '../../../components/header/Header.svelte';
	import Input from 'components/input/Input.svelte';

	export let data;

	$: ({ getSettings } = data);
	$: settings = $getSettings.data?.settings?.list[0].setting;

	$: interval = '';
</script>

<Header title="Settings" />

<form method="POST" action="?/updateSettings" id="update-settings">
	{#if $getSettings.fetching}
		<li>Loading...</li>
	{:else if $getSettings.errors}
		<li>{$getSettings.errors}</li>
	{:else if settings}
		<section>
			<h2>Reminder settings</h2>
			<div>
				<Input label="Notice period" type="number" id="notice" name="notice" />
			</div>

			<fieldset class="options">
				<legend>Interval</legend>
				<div class="option option-first">
					<input
						type="radio"
						name="interval"
						id="days"
						value="DAYS"
						checked={interval === 'DAYS'}
						on:change={() => (interval = 'DAYS')}
						required />
					<label for="days">Days</label>
				</div>
				<div class="option">
					<input
						type="radio"
						name="interval"
						id="months"
						value="MONTHS"
						checked={interval === 'MONTHS'}
						on:change={() => (interval = 'MONTHS')}
						required />
					<label for="months">Months</label>
				</div>
				<div class="option option-last">
					<input
						type="radio"
						name="interval"
						id="years"
						value="YEARS"
						checked={interval === 'YEARS'}
						on:change={() => (interval = 'YEARS')}
						required />
					<label for="years">Years</label>
				</div>
			</fieldset>
		</section>

		<section>
			<h2>Account settings</h2>

			<input type="hidden" id="id" name="id" value={settings.id ?? ''} />
			<div>
				<Input
					label="Email address"
					type="text"
					id="email"
					name="email"
					value={settings.email ?? ''} />
			</div>
			<div>
				<Input
					label="First name"
					type="text"
					id="firstName"
					name="firstName"
					value={settings.first_name ?? ''} />
			</div>

			<div>
				<Input
					label="Last name"
					type="text"
					id="lastName"
					name="lastName"
					value={settings.last_name ?? ''} />
			</div>
			<div class="currency">
				<label for="currency">Currency</label>
				<select id="currency">
					<option value="">Select your currency</option>
					<option value="GBP">£ GBP</option>
					<option value="USD">$ USD</option>
					<option value="EUR">€ EUR</option>
					<option value="CAD">$ CAD</option>
					<option value="AUD">$ AUD</option>
					<option value="JPY">¥ JPY</option>
				</select>
			</div>

			<div class="actions">
				<Button style="delete" type="button">Delete account</Button>
				<Button type="submit" form="update-settings">Update account</Button>
			</div>
		</section>
	{/if}
</form>

<style>
	h2 {
		color: var(--remindwise-grey);
		font-size: 20px;
		font-weight: 600;
		line-height: 24px;
		margin-bottom: 1rem;
	}

	form {
		max-width: 64rem;
		margin: 3.4rem;
		display: flex;
		flex-direction: column;
		gap: 3.4rem;
	}

	label,
	legend {
		display: block;
		margin-right: 0.7rem;
		margin-bottom: 0.7rem;
		color: var(--remindwise-grey);
	}

	select {
		background-color: var(--white);
		border: 1px solid var(--greyed-out);
		border-radius: 0.6rem;
		padding: 0.9rem 1.4rem;
		width: 100%;
		box-sizing: border-box;
		cursor: pointer;
	}

	section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.actions {
		display: flex;
		justify-content: space-between;
		max-width: 64rem;
		margin-top: 3rem;
	}

	fieldset {
		all: unset;
	}

	.options {
		display: flex;
		flex: 1;
	}

	.option {
		flex: 1;
	}

	.option input {
		position: absolute;
		visibility: hidden;
	}

	.option label {
		background-color: var(--cream-light);
		border-top: 1px solid var(--cream);
		border-bottom: 1px solid var(--cream);
		padding-top: 1rem;
		padding-bottom: 1rem;
		margin-bottom: 0;
		width: 100%;
		text-align: center;
	}

	.option-first label {
		border-top-left-radius: 2rem;
		border-bottom-left-radius: 2rem;
		border-right: 1px solid var(--cream);
	}

	.option-last label {
		border-top-right-radius: 2rem;
		border-bottom-right-radius: 2rem;
		border-left: 1px solid var(--cream);
	}

	.option label:hover {
		background-color: var(--cream);
		cursor: pointer;
	}

	.options input[type='radio']:checked + label {
		background-color: var(--orange);
		color: var(--white);
	}

	.currency {
		max-width: 18.8rem;
	}
</style>
