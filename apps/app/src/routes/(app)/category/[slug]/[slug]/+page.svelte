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
				>Edit reminder <svg class="edit">
					<use xlink:href="#icon-edit-category"></use>
				</svg></Link>
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

			<h2 class="heading-4">Things to remember</h2>
			{#if reminder.notes}
				<p class="remember">
					{reminder.notes}
				</p>
			{:else}
				<p class="no-notes">No notes have been added.</p>
			{/if}
		</div>

		<aside>
			<h3 class="heading-5">Your documents</h3>
			{#if data.files}
				<ul class="documents">
					{#each data.files as file}
						<li>
							<a href={file.url}>
								<svg>
									<use xlink:href="#icon-pdf"></use>
								</svg>
								<p>{file.name}</p>
								<svg>
									<use xlink:href="#icon-view"></use>
								</svg>
							</a>
						</li>
					{/each}
				</ul>
			{:else}
				<p>No documents have been added.</p>
			{/if}
		</aside>
	{/if}
</article>

<style>
	.body {
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
		fill: var(--orange);
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

	aside p,
	.no-notes {
		font-weight: 300;
	}

	.documents li {
		background-color: var(--white);
		padding: 1.4rem 1.2rem 1.2rem;
		margin-top: 1rem;
	}

	.documents svg {
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
