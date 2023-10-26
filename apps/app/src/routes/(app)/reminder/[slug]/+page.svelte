<script lang="ts">
	import Header from '../../../../components/header/Header.svelte';
</script>

<Header title="" />

<article class="body">
	<h1>Home Insurance</h1>

	<div class="content">
		<p class="overview">
			with <span class="highlight">Churchill</span><br /> at a cost of
			<span class="highlight">£565</span><br />
			due for renewal on <span class="highlight">1st Sept 2023</span><br /> will
			be charged <span class="highlight">monthly</span><br /> and will be
			renewed
			<span class="highlight">automatically</span>
		</p>

		<h2 class="heading-4">Things to remember</h2>
		<p class="remember">
			Churchill renewal contact number: 0345 603 3551 Link to Churchill website:
			<a href="">churchill.com/home-insurance/contact-us</a>
		</p>
	</div>

	<aside>
		<h3 class="heading-5">Your documents</h3>
		<ul class="documents">
			<li>
				<a href="">
					<img src="/icon-pdf.svg" alt="" />
					<p>Manypets-renewal-invation.Pdf</p>
					<img src="/magnifying-glass.svg" alt="" />
				</a>
			</li>
			<li>
				<a href="">
					<img src="/icon-pdf.svg" alt="" />
					<p>Manypets-renewal-invation.Pdf</p>
					<img src="/magnifying-glass.svg" alt="" />
				</a>
			</li>
		</ul>
	</aside>
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

	.remember a {
		color: var(--orange);
		font-weight: 600;
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
