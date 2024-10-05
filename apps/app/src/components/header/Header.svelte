<script lang="ts">
	export let title = '';
	export let icon: string | null = '';
	export let back: { text: string; href: string } | undefined = undefined;
</script>

<header>
	{#if title}
		<h1 class="title heading-2">
			{title}
			{#if icon}
				<svg>
					<use xlink:href="#{icon}"></use>
				</svg>
			{/if}
		</h1>
	{/if}
	{#if back}
		<h2 class="heading-5"><a class="back" href={back.href}>{back.text}</a></h2>
	{/if}
	<a href="/notifications" class="notification" title="Recent notifications">
		<svg>
			<use xlink:href="#icon-notification"></use>
		</svg>
		<!-- <span>3</span> -->
	</a>
</header>

<style>
	header {
		background: linear-gradient(180deg, #fff 0%, #f6f6f6 100%);
		padding: 2rem 2.1rem;
		display: flex;
		justify-content: space-between;
	}
	.title {
		color: var(--orange);
		display: flex;
		align-items: baseline;
		margin-bottom: 0;
	}

	.title svg {
		width: 1.7rem;
		height: 1.7rem;
		fill: var(--cream-dark);
		margin-left: 1.2rem;
		transform: translateY(0.3rem);
	}

	.back {
		color: var(--orange);
		text-decoration: none;
	}

	.back::before {
		content: '<';
		margin-right: 1rem;
	}

	.back:hover {
		text-decoration: underline;
	}

	.notification {
		position: relative;
	}
	.notification svg {
		width: 3rem;
		height: 3rem;
	}

	/* .notification span {
		background-color: var(--orange);
		border-radius: 50%;
		font-size: 1.2rem;
		color: var(--cream-light);
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(50%, -25%);
		width: 1.8rem;
		height: 1.8rem;
		display: flex;
		justify-content: center;
		align-items: center;
	} */

	@media screen and (min-width: 1024px) {
		header {
			padding-left: 4.2rem;
			padding-right: 4.2rem;
		}
	}
</style>
