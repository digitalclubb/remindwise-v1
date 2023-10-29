<script lang="ts">
	import Header from '../../../../components/header/Header.svelte';

	export let data;

	$: ({ getReminder } = data);
	$: reminder = $getReminder.data?.reminders?.list[0].reminder;

	$: cost = reminder
		? new Intl.NumberFormat('en-GB', {
				style: 'currency',
				currency: 'GBP',
		  }).format(reminder.cost)
		: '';

	$: date = reminder
		? new Intl.DateTimeFormat('en-GB').format(
				Date.parse(reminder.datePurchased || 0)
		  )
		: '';

	$: back = reminder
		? {
				text: `Back to ${reminder.category.name}`,
				href: `/category/${reminder.category.name}`,
		  }
		: {
				text: '',
				href: '',
		  };
</script>

<Header {back} />

<article class="body">
	{#if $getReminder.fetching}
		loading...
	{:else}
		<h1>{reminder.name} <span>{reminder.category.name}</span></h1>

		<div class="content">
			<p class="overview">
				with <span class="highlight">{reminder.company}</span><br /> at a cost
				of
				<span class="highlight">{cost}</span><br />
				due for renewal on
				<span class="highlight">{date}</span><br /> will be charged
				<span class="highlight">monthly</span><br /> and will be renewed
				<span class="highlight">automatically</span>
			</p>

			<h2 class="heading-4">Things to remember</h2>
			<p class="remember">
				{reminder.notes}
			</p>
		</div>

		<aside>
			<h3 class="heading-5">Your documents</h3>
			<ul class="documents">
				<li>
					<!-- svelte-ignore a11y-invalid-attribute -->
					<a href="">
						<img src="/icon-pdf.svg" alt="" />
						<p>Manypets-renewal-invation.Pdf</p>
						<img src="/magnifying-glass.svg" alt="" />
					</a>
				</li>
				<li>
					<!-- svelte-ignore a11y-invalid-attribute -->
					<a href="">
						<img src="/icon-pdf.svg" alt="" />
						<p>Manypets-renewal-invation.Pdf</p>
						<img src="/magnifying-glass.svg" alt="" />
					</a>
				</li>
			</ul>
		</aside>
	{/if}
</article>

<style>
	.body {
		padding: 2.4rem 4.2rem;
		display: grid;
		grid-template-areas:
			'header'
			'content'
			'aside';
	}

	h1 {
		text-transform: capitalize;
	}

	h1 span {
		font-size: 1.4rem;
		margin-left: 2.4rem;
	}

	.content {
		grid-area: content;
		background-color: var(--cream-light);
		padding: 2rem 3rem;
		margin-bottom: 3rem;
	}

	.overview {
		font-size: 1.6rem;
		font-weight: 600;
		line-height: 3rem;
		margin-bottom: 3rem;
	}

	.highlight {
		color: var(--orange);
	}

	.remember {
		background-color: var(--white);
		padding: 2rem;
		border-radius: 0.6rem;
		font-weight: 300;
	}

	aside {
		grid-area: aside;
		background-color: var(--cream-light);
		padding: 2rem;
	}

	.documents li {
		background-color: var(--white);
		padding: 1.4rem 1.2rem 1.2rem;
		margin-top: 1rem;
	}

	.documents img {
		width: 2rem;
		height: 2rem;
		margin-right: 1.8rem;
	}

	.documents a {
		display: flex;
		color: var(--remindwise-grey);
		text-decoration: none;
	}

	.documents p {
		margin-right: 1.8rem;
		flex-grow: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	@media screen and (min-width: 76.8em) {
		.body {
			grid-template-areas:
				'header header'
				'content aside'
				'content aside';
		}

		.content {
			margin-right: 3rem;
			margin-bottom: 0;
		}
	}
</style>
