<script lang="ts">
</script>

<header>
	<h1 class="heading-2">Dashboard</h1>
	<a href="" class="notification">
		<img src="/notification.svg" alt="" width="" height="" />
		<span>3</span>
	</a>
</header>

<div class="body">
	<section>
		<h2 class="heading-3">
			Total spend this year <span>(Jan '23 - Jan '24)</span>
		</h2>
	</section>

	<section>
		<h2 class="heading-3">Upcoming renewals <span>(3)</span></h2>
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Company</th>
					<th>Cost</th>
					<th>Due date</th>
					<th>Auto renewal</th>
					<th>Info</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>[icon] Home insurance</td>
					<td>Churchill</td>
					<td>£561</td>
					<td>01.10.23</td>
					<td>No</td>
					<td
						><button class="info">
							<img src="/magnifying-glass.svg" alt="" />
						</button></td
					>
				</tr>
				<tr>
					<td>[icon] Home insurance</td>
					<td>Churchill</td>
					<td>£561</td>
					<td>01.10.23</td>
					<td>No</td>
					<td>
						<button class="info">
							<img src="/magnifying-glass.svg" alt="" />
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</section>

	<section>
		<h2 class="heading-3">Ongoing <span>(16)</span></h2>
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Company</th>
					<th>Re-occuring cost</th>
					<th>Total accured</th>
					<th>Info</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Netflix</td>
					<td>Netflix</td>
					<td>£12</td>
					<td>£12</td>
					<td
						><button class="info">
							<img src="/magnifying-glass.svg" alt="" />
						</button></td
					>
				</tr>
				<tr>
					<td>Netflix</td>
					<td>Netflix</td>
					<td>£12</td>
					<td>£12</td>
					<td
						><button class="info">
							<img src="/magnifying-glass.svg" alt="" />
						</button></td
					>
				</tr>
				<tr>
					<td>Netflix</td>
					<td>Netflix</td>
					<td class="not-applicable">N/A</td>
					<td>£12</td>
					<td
						><button class="info">
							<img src="/magnifying-glass.svg" alt="" />
						</button></td
					>
				</tr>
			</tbody>
		</table>
	</section>
</div>

<style>
	header {
		background: linear-gradient(180deg, #fff 0%, #f6f6f6 100%);
		padding: 2.4rem 4.2rem;
		display: flex;
		justify-content: space-between;
	}

	h1 {
		color: var(--orange);
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

	.body {
		padding: 2.4rem 4.2rem;
	}

	section {
		margin-bottom: 3rem;
	}

	h2 span {
		font-weight: 300;
	}

	table {
		border-collapse: collapse;
		width: 100%;
	}

	th {
		background-color: var(--cream);
		padding: 1rem 2rem;
		text-align: left;
		font-weight: 500;
	}

	th:first-child {
		padding-left: 5rem;
		border-top-left-radius: 0.6rem;
	}

	th:last-child {
		border-top-right-radius: 0.6rem;
		text-align: center;
	}

	td {
		background-color: var(--cream-light);
		padding: 1rem 2rem;
		border-top: 1px solid var(--white);
	}

	td:last-child {
		text-align: center;
	}

	.not-applicable {
		color: var(--grey-light);
	}

	.info {
		all: unset;
		cursor: pointer;
	}

	.info img {
		width: 1.5rem;
		height: 1.5rem;
	}
</style>
