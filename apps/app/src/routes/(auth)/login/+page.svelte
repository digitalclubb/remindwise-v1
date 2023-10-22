<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from 'components/button/Button.svelte';
	import Link from 'components/link/Link.svelte';

	export let form;
</script>

<svelte:head>
	<title>remindwise.io - Login</title>
</svelte:head>

<div class="box">
	<div class="box-manual">
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
	<div class="box-social">
		<h2 class="heading-5">Or</h2>
	</div>
</div>

<p>
	<span>Don't have a remindwise account yet?</span>
	<Link href="/register" type="button">Register now</Link>
</p>

<style>
	.box {
		background-color: var(--white);
		border-radius: 0.6rem;
		margin-bottom: 3rem;
	}

	.box-manual {
		padding: 1.9rem 2.6rem 3.2rem 2.3rem;
	}

	.box-social {
		border-top: solid 1px var(--cream);
		background-color: var(--cream-light);
		text-align: center;
		padding: 2.5rem 3rem 4.7rem 3rem;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	h2 {
		text-transform: uppercase;
	}

	p {
		color: var(--white);
		font-size: 1.8rem;
		line-height: 2.4rem;
		font-weight: 600;
		text-align: center;
	}

	span {
		display: block;
		margin-bottom: 2rem;
	}
</style>
