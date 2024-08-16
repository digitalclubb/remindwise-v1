<script lang="ts">
	export let spentSoFar;
	export let upcoming;

	const total = spentSoFar + upcoming;
	const percentageSpent = (spentSoFar * 100) / total;
	const percentageUpcoming = (upcoming * 100) / total;
</script>

<div class="container">
	<svg width="100%" height="100%" viewBox="0 0 42 42" class="donut">
		<circle class="donut-hole" cx="41" cy="21" r="15.91549430918954" fill="#fff"
		></circle>
		<circle
			class="donut-ring"
			cx="21"
			cy="21"
			r="15.91549430918954"
			fill="transparent"
			stroke="var(--orange)"
			stroke-width="10"></circle>

		<circle
			class="donut-segment"
			cx="21"
			cy="21"
			r="15.91549430918954"
			fill="transparent"
			stroke="var(--remindwise-grey)"
			stroke-width="10"
			stroke-dasharray="{percentageSpent} {percentageUpcoming}"
			stroke-dashoffset="25"></circle>
	</svg>
</div>

<style>
	.container {
		width: 16rem;
		height: 16rem;
		margin: 0 auto 2rem;
	}
</style>
