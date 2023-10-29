<script lang="ts">
	export let title = '';
	export let icon = '';
	export let back = { href: '', text: '' };
</script>

<header>
	{#if title}
		<h1 class="title heading-2">{title} {icon}</h1>
	{/if}
	{#if back.text}
		<h1 class="heading-5"><a class="back" href={back.href}>{back.text}</a></h1>
	{/if}
	<a href="/notifications" class="notification">
		<img src="/notification.svg" alt="" width="" height="" />
		<span>3</span>
	</a>
</header>

<style>
	header {
		background: linear-gradient(180deg, #fff 0%, #f6f6f6 100%);
		padding: 2.4rem 4.2rem;
		display: flex;
		justify-content: space-between;
	}
	.title {
		color: var(--orange);
		text-transform: capitalize;
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
	.notification img {
		width: 3rem;
		height: 3rem;
	}

	.notification span {
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
	}
</style>
