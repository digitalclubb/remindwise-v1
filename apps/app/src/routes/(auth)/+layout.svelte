<main>
	<div>
		<slot />
	</div>
</main>

<style>
	main {
		background-color: #d1d1d1;
		display: grid;
		place-items: center;
		min-height: 100vh;
	}

	main > div {
		width: 40rem;
		background-color: #ffff;
		padding: 4rem;
		box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
	}
</style>
