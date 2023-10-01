<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from 'components/button/Button.svelte';

	export let form;
</script>

<svelte:head>
	<title>remindwise.io - Login</title>
</svelte:head>

<div class="box">
	<h1 class="heading-3">Login to your account</h1>
	<form method="post" use:enhance>
		<label for="email">Email Address</label>
		<input id="email" name="email" type="email" value={form?.email ?? ''} />
		<label for="password">Password</label>
		<input
			id="password"
			name="password"
			type="password"
			autocomplete="current-password"
		/>

		<Button>Sign in</Button>
	</form>
</div>

<p>Don't have a remindwise account yet?</p>
<Button element="a">Register now</Button>

<style>
	.box {
		background-color: #ffffff;
		border-radius: 0.6rem;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	p {
		color: #ffffff;
		font-size: 1.8rem;
		line-height: 2.4rem;
		font-weight: 600;
		text-align: center;
	}
</style>
