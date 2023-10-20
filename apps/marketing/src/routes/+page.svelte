<script lang="ts">
	import { Link } from 'components';
</script>

<svelte:head>
	<title>remindwise.io</title>
</svelte:head>

<header>
	<h1>
		<img src="logo.svg" alt="" class="logo" />
	</h1>
</header>

<main>
	<section class="intro">
		<div class="container">
			<div class="content">
				<h2 class="heading-1">Get wise. Get reminded.</h2>
				<h3>Easy renewals and account tracking</h3>
				<p>
					We all have multiple policies, subscriptions and accounts, its so hard
					to keep track of everything. Remindwise will keep all this info all in
					one place and remind you when the time comes. No more hunting around
					for last years policy document, just get reminded!
				</p>
				<Link href="#waitlist" type="button">Get reminded</Link>
			</div>

			<img src="images/hero.png" alt="" fetchpriority="high" />
		</div>
	</section>

	<div class="container">
		<section class="reminders reverse">
			<div class="content">
				<h2>Add new reminders and categorise to suit you</h2>
				<p>
					Remindwise is an app that will keep track of details of all your
					policies, subscriptions, accounts. Add your reminders and sort them
					into categoreis quickly and easily. Lorem ipsum dolor sit amet,
					consectetur adipiscing elit. Phasellus vitae leo dapibus, vestibulum
					odio vel, laoreet mi. Aliquam dictum risus nec facilisis vehicula.
				</p>
				<Link href="#waitlist" type="button">Get reminded</Link>
			</div>

			<img src="images/reminders.png" alt="" />
		</section>

		<section class="documents">
			<div class="content">
				<h2>Never panic search for a policy document again!</h2>
				<p>
					Upload a photo of your policy document, so come renewal time you know
					what you paid last year and what you were covered for. When your
					renewal comes around Remindwise will remind you and let you instantly
					view your document and any other important info you add to your
					reminder.
				</p>
				<Link href="#waitlist" type="button">Get reminded</Link>
			</div>

			<img src="images/laptop.png" alt="" fetchpriority="low" />
		</section>

		<section class="spending reverse">
			<div class="content">
				<h2>Keep track of spending</h2>
				<p>
					Remindwise will automatically create charts for you to keep track of
					what you have spent and what costs are upcoming to help you budget
					more easily. You can view these charts over the calendar year or a
					shorter period to suit you. Lorem ipsum dolor sit amet, consectetur
					adipiscing elit. Phasellus vitae leo dapibus, vestibulum odio vel,
					laoreet mi.
				</p>
				<Link href="#waitlist" type="button">Get reminded</Link>
			</div>

			<img src="images/spending.png" alt="" fetchpriority="low" />
		</section>

		<section id="waitlist" class="waiting-list">
			<h2>Be the first to know when we go live!</h2>
			<p>
				We're new but we'll be up and running soon. Provide your email address
				and we'll let you know when Remindwise launches
			</p>
			<form>
				<input type="text" placeholder="Your email" />
				<input type="submit" value="Register interest" />
			</form>
		</section>
	</div>

	<footer></footer>
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

	section {
		padding: 5rem 6.8rem 0 11.5rem;
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
	}

	p {
		margin-bottom: 0.8rem;
	}

	@media screen and (min-width: 76.8em) {
		section {
			display: flex;
			align-items: center;
		}

		.reverse img {
			order: -1;
		}

		.documents,
		.waiting-list {
			border-radius: 5rem;
		}
	}
</style>
