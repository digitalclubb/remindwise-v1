<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Input, Link } from 'components';

	export let form;
</script>

<svelte:head>
	<title>remindwise.io - Register</title>
</svelte:head>

<div class="boxes">
	<div class="box box-manual">
		<h1 class="heading-3">Sign up</h1>
		<form method="post" use:enhance>
			<Input
				label="Email"
				id="email"
				name="email"
				type="email"
				value={form?.email ?? ''}
				placeholder="Enter your email address"
				required />

			<Input
				label="Password"
				id="password"
				name="password"
				type="password"
				autocomplete="new-password"
				placeholder="Enter your password"
				required />
			<div class="login">
				<Button>Sign up</Button>
			</div>
		</form>
	</div>
	<div class="box box-social">
		<h2 class="heading-5">Or</h2>
		<ul class="">
			<li>
				<!-- svelte-ignore a11y-invalid-attribute -->
				<a href="" class="social-login">
					<img src="/icon-facebook.svg" alt="" /> Sign up with Facebook
				</a>
			</li>
			<li>
				<!-- svelte-ignore a11y-invalid-attribute -->
				<a href="" class="social-login"
					><img src="/icon-google.svg" alt="" /> Sign up with Google
				</a>
			</li>
			<li>
				<!-- svelte-ignore a11y-invalid-attribute -->
				<a href="" class="social-login"
					><img src="/icon-x.svg" alt="" /> Sign up with X</a>
			</li>
		</ul>
	</div>
</div>

<p>
	<span>Already have an account?</span>
	<Link href="/login" type="button">Login now</Link>
</p>
