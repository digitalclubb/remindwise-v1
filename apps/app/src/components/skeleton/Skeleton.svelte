<script lang="ts">
</script>

<div class="wrapper">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="150"
		height="150"
		viewBox="0 0 100 100"
		><circle
			cx="50"
			cy="50"
			r="30"
			stroke-width="8"
			fill="none"
			class="loading-spinner"></circle
		><circle
			cx="50"
			cy="50"
			r="30"
			stroke-linecap="round"
			stroke-width="8"
			fill="none"
			class="_1306vop2"></circle
		></svg>
</div>

<style>
	.wrapper {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.loading-spinner {
		stroke: currentColor;
		animation-duration: 1.4s;
		animation-iteration-count: infinite;
		animation-name: spinner;
		transform-origin: center;
	}

	@keyframes spinner {
		0% {
			transform: rotate(0);
			stroke-dasharray: 19 170;
		}

		50% {
			transform: rotate(180deg);
			stroke-dasharray: 94 94;
		}
		100% {
			transform: rotate(720deg);
			stroke-dasharray: 19 170;
		}
	}
</style>
