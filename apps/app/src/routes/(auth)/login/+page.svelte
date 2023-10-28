<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Input, Link } from 'components';

	export let form;
</script>

<svelte:head>
	<title>remindwise.io - Login</title>
</svelte:head>

<div class="boxes">
	<div class="box box-manual">
		<h1 class="heading-3">Login to your account</h1>
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

			<Input
				label="Password"
				id="password"
				name="password"
				type="password"
				autocomplete="current-password"
				placeholder="Enter your password"
				required
			/>

			<a href="/forgot-password" class="forgotten">Forgotten your password?</a>
			<div class="login">
				<Button>Login</Button>
			</div>
		</form>
	</div>
	<div class="box box-social">
		<h2 class="heading-5">Or</h2>
		<ul class="">
			<li>
				<!-- svelte-ignore a11y-invalid-attribute -->
				<a href="" class="social-login">
					<img src="/icon-facebook.svg" alt="" /> Login with Facebook
				</a>
			</li>
			<li>
				<!-- svelte-ignore a11y-invalid-attribute -->
				<a href="" class="social-login"
					><img src="/icon-google.svg" alt="" /> Login with Google
				</a>
			</li>
			<li>
				<!-- svelte-ignore a11y-invalid-attribute -->
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
	@import '../styles.css';
</style>
