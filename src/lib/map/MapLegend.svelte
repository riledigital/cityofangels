<section class="map-legend">
	<header class="map-legend__header">
		<h2 class="map-legend__heading">Map Legend</h2>
	</header>
	<div class="map-legend__symbols">
		<div class="legend__item legend-fire">
			<svg overflow="visible" viewBox="0 0 10 10" fill="#FF5A5F">
				<circle cx="5" cy="5" r="5" />
			</svg>
			Airbnb rental listing
		</div>
		<div class="legend__item legend-fire-2">
			<svg overflow="visible" viewBox="0 0 10 10" fill="#7e75fc">
				<circle cx="5" cy="5" r="5" />
			</svg>
			Report of homelessness encampment
		</div>

		<div class="legend__item legend-fire-2">
			<svg overflow="visible" viewBox="0 0 10 10" fill="blue">
				<line x1="0" y1="0" x2="10" y2="10" stroke="#52cc00" stroke-width="4" />
			</svg>
			Neighborhood boundary
		</div>
	</div>
</section>

<style>
	.map-legend {
		background: rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(2px);
		display: inline-block;
		position: fixed;
		margin: 0;
		bottom: 2vh;
		left: 2vh;
		overflow: hidden;
		z-index: 10;
		padding: 1rem;
		font-size: 0.65rem;
	}
	@media screen and (min-width: 900px) {
		.map-legend {
			font-size: 0.6rem;
			bottom: 5vh;
			left: unset;
			right: 5vh;
			padding: var(--margin-mobile);
			max-width: 45vw;
		}
	}

	.map-legend__symbols {
		height: auto;
		width: 100%;
	}

	.legend__item {
		font-size: inherit;
	}

	.map-legend__header {
	}

	.map-legend__heading {
		font-size: 0.5rem;
		font-weight: 700;
		margin: 0;
		letter-spacing: 0.5px;
	}

	.map-legend__symbols {
		display: flex;
		flex-direction: column;
	}

	.map-legend svg {
		height: 0.6rem;
		width: 0.6rem;
	}
</style>
