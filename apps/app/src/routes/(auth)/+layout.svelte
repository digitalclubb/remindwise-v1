<main>
	<div>
		<img src="./logo.svg" alt="Remindwise.io" width="275" height="44" />
		<div class="slot">
			<slot />
		</div>
	</div>
</main>

<style>
	main {
		background-color: var(--grey-dark);
		display: grid;
		place-items: center;
		min-height: 100vh;
		padding: 0 2rem;
	}

	img {
		margin: 0 auto;
		margin-bottom: 4rem;
	}

	.slot {
		max-width: 69rem;
	}
</style>
