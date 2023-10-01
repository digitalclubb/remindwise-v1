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
	}

	img {
		margin: 0 auto;
		margin-bottom: 7rem;
	}

	.slot {
		width: 69rem;
	}
</style>
