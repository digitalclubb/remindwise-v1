<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Input } from 'components';

	export let form;
</script>

<svelte:head>
	<title>remindwise.io - Forgot password</title>
</svelte:head>

<div class="boxes">
	<div class="box box-manual">
		<h1 class="heading-3">Forgot password</h1>

		{#if form?.success || form?.error}
			<p>{form?.message}</p>
		{/if}

		<form method="post" use:enhance>
			<Input
				label="Email"
				id="email"
				name="email"
				type="email"
				value={form?.email ?? ''}
				placeholder="Enter your email address"
				required
			/>

			<div class="login">
				<Button>Reset password</Button>
			</div>
		</form>

		<a href="/login" class="forgotten">Back to login</a>
	</div>
</div>

<style>
	@import '../styles.css';

	.box-manual {
		background-color: var(--white);
		border-radius: 0.6rem;
	}

	@media screen and (min-width: 768px) {
		.box-manual {
			padding: 2rem 4.8rem 4rem 3.8rem;
		}
	}

	p {
		color: var(--remindwise-grey);
	}
</style>
