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

	main :global(.boxes) {
		margin-bottom: 3rem;
		display: flex;
		flex-direction: column;
	}

	main :global(.box) {
		padding: 1.9rem 2.6rem 3.2rem 2.3rem;
	}

	main :global(.box-manual) {
		background-color: var(--white);
		border-top-left-radius: 0.6rem;
		border-top-right-radius: 0.6rem;
	}

	main :global(.box-social) {
		border-top: solid 1px var(--cream);
		background-color: var(--cream-light);
		text-align: center;
		border-bottom-left-radius: 0.6rem;
		border-bottom-right-radius: 0.6rem;
	}
	main :global(form) {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	main :global(h2) {
		text-transform: uppercase;
	}

	main :global(p) {
		color: var(--white);
		font-size: 1.8rem;
		line-height: 2.4rem;
		font-weight: 600;
		text-align: center;
	}

	main :global(span) {
		display: block;
		margin-bottom: 2rem;
	}

	main :global(.forgotten) {
		display: block;
		margin-top: 2rem;
		margin-bottom: 1.8rem;
		color: var(--orange);
		text-decoration: none;
	}

	main :global(.forgotten:hover) {
		text-decoration: underline;
	}

	main :global(.login) {
		text-align: right;
	}

	main :global(li) {
		margin-top: 2rem;
	}

	main :global(.social-login) {
		display: flex;
		align-items: center;
		background: linear-gradient(180deg, #fff 0%, #f6f6f6 100%);
		color: var(--grey);
		text-decoration: none;
		border: 1px solid var(--greyed-out);
		border-radius: 2rem;
		text-align: left;
		padding: 0.9rem 1.4rem;
		width: 21.4rem;
	}

	main :global(.social-login img) {
		height: 1rem;
		margin-right: 1rem;
	}

	main :global(.social-login:hover) {
		background: linear-gradient(180deg, #f6f6f6 0%, var(--greyed-out) 100%);
	}

	@media screen and (min-width: 1024px) {
		main :global(.boxes) {
			flex-direction: row;
			margin-bottom: 4rem;
		}

		main :global(.box-manual) {
			border-top-right-radius: 0;
			border-bottom-left-radius: 0.6rem;
			padding: 2rem 4.8rem 4rem 3.8rem;
		}

		main :global(.box-social) {
			display: flex;
			justify-content: center;
			flex-direction: column;
			border-bottom-left-radius: 0;
			border-top-right-radius: 0.6rem;
			padding-left: 5rem;
			padding-right: 5rem;
		}

		main :global(input) {
			width: 29rem;
		}
	}
</style>
