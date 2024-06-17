<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let form;

	let loading = false;

	const registerInterest: SubmitFunction = () => {
		loading = true;

		return async ({ update }) => {
			loading = false;
			await update();
		};
	};
</script>

<svelte:head>
	<title
		>remindwise.io - Keep track of subscriptions, accounts, and policies. All in
		one place.</title>
	<meta
		name="description"
		content="Discover remindwise.io, the user-friendly app that simplifies managing your policies, subscriptions, and accounts. Easily organise, track expenses, and get timely reminders for hassle-free financial planning." />
</svelte:head>

<header>
	<h1 class="container">
		<img src="logo.svg" alt="remindwise.io" class="logo" />
	</h1>
</header>

<main>
	<section class="intro">
		<div class="container">
			<div class="content">
				<h2 class="heading-1">Get wise. <br />Get reminded.</h2>
				<h3>Easy renewals and account tracking</h3>
				<p>
					Managing multiple policies, subscriptions, and accounts can be hard.
					Remindwise can help you save your information in one place and gives
					you a friendly reminder when it's time to take action. No more frantic
					searches for last year's policy document, no more searching your inbox
					for your insurance provider. Remindwise is here to help.
				</p>
				<a href="#waitlist" class="button"> Register interest </a>
			</div>

			<img
				src="images/hero.png"
				alt="Large hand holding phone with Remindwise app open. Other hands in the background waving paper statements and bills." />
		</div>
	</section>

	<div class="container">
		<section class="reminders reverse">
			<div class="content">
				<h2>Add new reminders and categorise to suit you</h2>
				<p>
					Remindwise is the app that helps you effortlessly stay on top of your
					policies, subscriptions, and accounts. Easily add your reminders and
					organise them into categories all in one place, making life simpler
					and more exciting.
				</p>
				<a href="#waitlist" class="button"> Register interest </a>
			</div>

			<img
				src="images/reminders.png"
				alt="A persons hand using Remindwise app. Adding a reminder." />
		</section>

		<section class="documents">
			<div class="content">
				<h2>Never panic search for a policy document again!</h2>
				<p>
					Upload your policy documents, so when renewal time rolls around,
					you'll have a clear record of last year's costs and what's covered.
					With Remindwise, you can instantly access your document and any other
					vital information you've attached to your reminder. Keeping things
					simple and convenient for you.
				</p>
				<a href="#waitlist" class="button"> Register interest </a>
			</div>

			<img
				src="images/laptop.png"
				alt="A person using a laptop, looking at the Remindwise app" />
		</section>

		<section class="spending reverse">
			<div class="content">
				<h2>Keep track of spending</h2>
				<p>
					Remindwise takes care of the number-crunching for you, automatically
					generating clear, user-friendly charts. These charts help you monitor
					your past expenses and upcoming costs, making budgeting a breeze.
					Whether you prefer an overview of your entire year or a closer look at
					a specific time frame, it's all about your convenience.
				</p>
				<a href="#waitlist" class="button"> Register interest </a>
			</div>

			<img
				src="images/spending.png"
				alt="A persons hand using Remindwise app. Viewing their total monthly spend." />
		</section>

		<section id="waitlist" class="waiting-list">
			<h2>Be the first to know when we go live!</h2>
			<p>
				We're new but we'll be up and running soon. Provide your email address
				and we'll let you know when Remindwise launches
			</p>
			{#if loading}
				<p class="message">Submitting...</p>
			{:else if form?.error}
				<p class="message">{form?.message}</p>
			{:else if form?.success}
				<p class="message">
					{form?.message
						? form?.message
						: "Thank you for your email. We'll keep you updated when we go live!"}
				</p>
			{:else}
				<form method="POST" use:enhance={registerInterest}>
					<input
						class="input"
						name="email"
						type="email"
						placeholder="Your email"
						required
						value={form?.email ?? ''} />
					<input class="submit" type="submit" value="Register interest" />
				</form>
			{/if}
		</section>
	</div>

	<footer>
		<div class="container">
			<p>&copy; Remindwise 2023</p>
			<img src="logo.svg" alt="" class="logo" />
		</div>
	</footer>
</main>

<style>
	header {
		background-color: var(--grey);
		padding: 2rem;
	}

	.logo {
		width: 17rem;
		height: 2.8rem;
	}

	.container {
		max-width: 118rem;
		margin: 0 auto;
	}

	.reminders,
	.documents,
	.spending,
	section .container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	section {
		padding: 5rem 2rem 0 2rem;
	}

	.intro {
		background: linear-gradient(128deg, #f5f5f5 18.09%, #cac7c1 79.74%);
	}

	.reminders {
		background-color: var(--white);
	}

	.documents {
		background: linear-gradient(279deg, #252b32 43.11%, #333a42 98.23%);
		color: var(--white);
	}
	.waiting-list {
		background-color: var(--orange);
		color: var(--white);
		padding-bottom: 9rem;
	}

	.content {
		max-width: 47rem;
		padding-bottom: 2rem;
	}

	p {
		font-weight: 300;
		margin-bottom: 1.4rem;
	}

	.message {
		font-size: 2.4rem;
		margin-top: 4rem;
	}

	form {
		display: flex;
		flex-direction: column;
	}

	.input {
		border-radius: 1.6rem;
		border: 3px solid var(--cream-dark);
		font-size: 2rem;
		font-weight: 600;
		line-height: 2.4rem;
		color: var(--grey);
		padding: 2.7rem 3.9rem;
	}

	.input::placeholder {
		color: var(--grey);
	}

	.submit {
		background-color: var(--grey);
		color: var(--cream-light);
		border: none;
		border-radius: 2rem;
		font-size: 2rem;
		font-weight: 600;
		padding: 3rem;
		margin-top: 1.5rem;
		cursor: pointer;
	}

	.submit:hover {
		background-color: var(--grey-dark);
	}

	footer {
		background-color: var(--grey);
		padding: 2.9rem 3.3rem 2.9rem 6.4rem;
		color: var(--cream);
	}

	footer .container {
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		align-items: center;
	}

	.button {
		display: flex;
		align-items: center;
		text-decoration: none;
		background-color: var(--orange);
		border-radius: 2rem;
		border: solid 1px var(--orange);
		display: inline-block;
		padding: 0.8rem 1.4rem;
		font-size: 1.4rem;
		line-height: 1.6rem;
		color: var(--white);
		font-weight: 400;
		text-align: center;
		text-decoration: none;
	}

	.button:hover {
		background-color: var(--orange-dark);
		border-color: var(--orange-dark);
		color: var(--white);
		cursor: pointer;
	}

	@media screen and (min-width: 768px) {
		section {
			display: block;
			padding: 5rem 6.8rem 0 11.5rem;
		}

		section .container {
			justify-content: flex-start;
		}

		img {
			width: 50%;
		}

		.reverse img {
			order: -1;
		}

		.reminders,
		.documents,
		.spending {
			flex-wrap: nowrap;
		}

		.documents,
		.waiting-list {
			border-radius: 5rem;
		}

		form {
			flex-direction: row;
		}

		.input {
			flex-grow: 1;
		}

		.submit {
			margin-top: 0;
			margin-left: 1.5rem;
		}

		footer {
			margin-top: 15rem;
		}

		footer .container {
			justify-content: space-between;
			flex-direction: row;
		}

		footer p {
			margin-bottom: 0;
		}
	}

	@media screen and (min-width: 1280px) {
		.intro .container {
			position: relative;
			padding-bottom: 10rem;
		}

		.intro img {
			position: absolute;
			right: 0;
			bottom: 0;
		}

		img {
			width: auto;
		}
	}
</style>
