<script lang="ts">
	import { enhance } from '$app/forms';

	export let form;
</script>

<main>
	<div>
		<h1>Register</h1>
		<form method="post" use:enhance>
			<label for="email">Email Address</label>
			<input name="email" type="email" value="{form?.email ?? ''}" />
			<label for="password">Password</label>
			<input name="password" type="password" />

			<button>Register</button>
			<a href="/login">Already have an account? Sign in</a>
		</form>
	</div>
</main>

<style>
	main {
		background-color: #d1d1d1;
		display: grid;
		place-items: center;
		min-height: 100vh;
	}

	main > div {
		width: 40rem;
		background-color: #ffff;
		padding: 4rem;
		box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
</style>
