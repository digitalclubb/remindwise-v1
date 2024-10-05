<script lang="ts">
	import Header from '../../../components/header/Header.svelte';
</script>

<svelte:head>
	<title>Get in touch · remindwise.io</title>
</svelte:head>

<Header title="Get in touch" />

<article class="body">
	<h2 class="heading-3">Email</h2>
	<p>
		For any enquiries, please reach out to us on <a
			href="mailto:help@remindwise.io">help@remindwise.io</a>
	</p>
</article>

<style>
	a {
		color: var(--orange);
	}

	a:hover {
		text-decoration: none;
	}
</style>
