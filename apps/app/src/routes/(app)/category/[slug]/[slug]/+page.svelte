<script lang="ts">
	import Link from 'components/link/Link.svelte';
	import Header from '../../../../../components/header/Header.svelte';
	import type { PageData } from './$houdini';
	import { page } from '$app/stores';

	export let data: PageData;

	$: reminder = data?.data?.reminders?.list[0].reminder;

	$: cost = reminder
		? new Intl.NumberFormat('en-GB', {
				style: 'currency',
				currency: 'GBP',
		  }).format(reminder.cost || 0)
		: '';

	$: date = reminder
		? new Intl.DateTimeFormat('en-GB').format(
				Date.parse(reminder?.date?.toString() || '') || new Date()
		  )
		: '';

	$: back = reminder
		? {
				text: `Back to ${reminder.category?.name}`,
				href: `/category/${reminder.category?.name}`,
		  }
		: {
				text: '',
				href: '',
		  };
</script>

<Header {back} />

<article class="body">
	{#if !data?.data}
		loading...
	{:else if reminder}
		<div class="header">
			<h1>
				{reminder.name} <span>{reminder.category?.name}</span>
			</h1>
			<Link href={`/reminder/edit/${$page.params.slug}`}
				>Edit reminder <img
					src="/icon-edit-category.svg"
					class="edit"
					alt="" /></Link>
		</div>

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

			{#if reminder.notes}
				<h2 class="heading-4">Things to remember</h2>
				<p class="remember">
					{reminder.notes}
				</p>
			{/if}
		</div>

		{#if data.files}
			<aside>
				<h3 class="heading-5">Your documents</h3>
				<ul class="documents">
					{#each data.files as file}
						<li>
							<a href={file.url}>
								<img src="/icon-pdf.svg" alt="" />
								<p>{file.name}</p>
								<img src="/icon-view.svg" alt="" />
							</a>
						</li>
					{/each}
				</ul>
			</aside>
		{/if}
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

	.header {
		display: flex;
		justify-content: space-between;
		align-items: first baseline;
		grid-area: header;
	}

	h1 {
		text-transform: capitalize;
		margin-bottom: 0;
	}

	h1 span {
		font-size: 1.4rem;
		margin-left: 2.4rem;
	}

	.edit {
		width: 2rem;
		height: 2rem;
		margin-left: 0.8rem;
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

	@media screen and (min-width: 768px) {
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
