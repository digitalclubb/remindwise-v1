<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from 'components/button/Button.svelte';
	import Link from 'components/link/Link.svelte';

	export let form;
</script>

<svelte:head>
	<title>remindwise.io - Login</title>
</svelte:head>

<div class="boxes">
	<div class="box box-manual">
		<h1 class="heading-3">Login to your account</h1>
		<form method="post" use:enhance>
			<label for="email">Email</label>
			<input
				id="email"
				name="email"
				type="email"
				value={form?.email ?? ''}
				placeholder="Enter your email address"
			/>
			<label for="password">Password</label>
			<input
				id="password"
				name="password"
				type="password"
				autocomplete="current-password"
				placeholder="Enter your password"
			/>

			<a href="" class="forgotten">Forgotten your password?</a>
			<Button>Login</Button>
		</form>
	</div>
	<div class="box box-social">
		<h2 class="heading-5">Or</h2>
		<ul>
			<li>
				<a href="" class="social-login">
					<img src="/icon-facebook.svg" alt="" /> Login with Facebook
				</a>
			</li>
			<li>
				<a href="" class="social-login"
					><img src="/icon-google.svg" alt="" /> Login with Google
				</a>
			</li>
			<li>
				<a href="" class="social-login"
					><img src="/icon-x.svg" alt="" /> Login with X</a
				>
			</li>
		</ul>
	</div>
</div>

<p>
	<span class="register-heading">Don't have a remindwise account yet?</span>
	<Link href="/register" type="button">Register now</Link>
</p>

<style>
	.boxes {
		background-color: var(--white);
		border-radius: 0.6rem;
		margin-bottom: 3rem;
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
	}

	.box {
		padding: 1.9rem 2.6rem 3.2rem 2.3rem;
	}

	.box-social {
		border-top: solid 1px var(--cream);
		background-color: var(--cream-light);
		text-align: center;
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

	input {
		display: block;
		border: 1px solid var(--grey-light);
		border-radius: 0.6rem;
		padding: 0.9rem 1.4rem;
	}

	.forgotten {
		display: block;
		margin-top: 2rem;
		margin-bottom: 1.8rem;
		color: var(--orange);
		text-decoration: none;
	}

	.forgotten:hover {
		text-decoration: underline;
	}

	li {
		margin-top: 2rem;
	}

	.social-login {
		display: flex;
		align-items: center;
		background: linear-gradient(180deg, #fff 0%, #f6f6f6 100%);
		color: var(--grey);
		text-decoration: none;
		border: 1px solid var(--grey-light);
		border-radius: 2rem;
		text-align: left;
		padding: 0.9rem 1.4rem;
		width: 21.4rem;
	}

	.social-login img {
		height: 1rem;
		margin-right: 1rem;
	}

	.social-login:hover {
		background: linear-gradient(180deg, #f6f6f6 0%, var(--grey-light) 100%);
	}

	@media screen and (min-width: 768px) {
	}
</style>
