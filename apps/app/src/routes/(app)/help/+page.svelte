<script lang="ts">
	import Button from '../../../components/button/Button.svelte';
	import Header from '../../../components/header/Header.svelte';
</script>

<svelte:head>
	<title>Help · remindwise.io</title>
</svelte:head>

<Header title="Help" />

<article class="body">
	<p>
		Explore our frequently asked questions below to discover how Remindwise
		works.
	</p>

	<h2 class="heading-3">Categories</h2>

	<details>
		<summary>How do I add a new category?</summary>
		<article>...</article>
	</details>

	<details>
		<summary>Is it possible to update an existing category?</summary>
		<article>...</article>
	</details>

	<h2 class="heading-3">Reminders</h2>

	<details>
		<summary>How do I edit the details of an existing reminder?</summary>
		<article>...</article>
	</details>

	<h2 class="heading-3">Settings</h2>

	<details>
		<summary>How do I change my local currency?</summary>
		<article>...</article>
	</details>

	<div class="contact">
		<p>Still can't find what you're looking for?</p>
		<Button>Contact us</Button>
	</div>
</article>

<style>
	p {
		margin-bottom: 1.6rem;
	}

	h2 {
		color: var(--orange);
		margin-top: 4.5rem;
		margin-bottom: 1.6rem;
	}

	details {
		max-width: 69.8rem;
	}

	summary {
		background-color: var(--cream-light);
		font-size: 1.6rem;
		line-height: 2rem;
		padding: 1.4rem 2rem;
		margin-bottom: 1.2rem;
		cursor: pointer;
	}

	summary::marker {
		color: var(--orange);
	}

	details[open] > summary {
		background-color: var(--remindwise-grey);
		color: var(--cream-light);
	}

	.contact {
		margin-top: 2.5rem;
	}
</style>
