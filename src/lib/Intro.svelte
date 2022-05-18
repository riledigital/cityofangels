<script>
	import { onMount } from 'svelte';

	import embed from 'vega-embed';
	import ScrollTrigger from '../lib/ScrollTrigger.svelte';
	import { makeOverviewScatter } from './plotStyles.js';

	onMount(async () => {
		const overviewScatterPlot = makeOverviewScatter('data/density_summary.csv');
		embed('.overview-scatter-embed', overviewScatterPlot).then((result) => console.log(result));
	});
</script>

<div class="scrollstory" id="scrollstory">
	<div class="title-card">
		<ScrollTrigger
			areaId="start"
			coords={JSON.stringify([-118.22181701660156, 34.04298753935195])}
			zoomLevel={4}
		/>
		<h1 class="title-card__title">Homelessness in the City of Angels</h1>
		<p class="byline">
			A data story by<br />
			Regina Joy Alcazar<br />
			and Ri Le
		</p>
	</div>
	z
	<div id="introduction" class="intro-container">
		<p class="lead">Welcome to Los Angeles!</p>

		<h3>The pervasive issue of poverty and homelessness in Los Angeles</h3>

		<p>
			Homelessness is a chronic problem plaguing the region perched below palm-tree-lined,
			iridescent sunsets, bustling show biz glamour and a cultural richness reflected in its
			culinary offerings, thriving creative community and sprawling estates. Compared to previous
			years, 2019 saw a stark increase in the number of people living in tents, vehicles, and
			shelters in both the City and County of Los Angeles–12% and 16% respectively (LAHSA, 2019).
		</p>
		<h3>Encampments through 311 complaints</h3>
		<p>
			The city's sunny skies and spacious built environment draw over 50 million visitors a year.
			Considering these preferential living conditions, the city provides an ideal landscape for the
			houseless to build their own homes. Whereever space permits, homeless encampments rise in
			clusters or in isolation, deconstructing the very notion of place and home.
		</p>

		<h3>Fantasy vs reality: a home for who?</h3>
		<p>
			This data journalism project investigates the extent of homelessness at three of Los Angeles'
			most iconic neighborhoods. We present a dichotomy between a fantasmic, imagined Los Angeles
			with the reality of homelessness in order to show the pervasive extent of housing insecurity
			across the beautiful City of Angels that is often romanticized in pop culture. To do this, we
			contrast georeferenced Airbnb rentals with 311 calls of homeless encampments in 2018 to
			produce this interactive web story.
		</p>

		<p>
			This perception of a La-La-Land that is often projected onto Los Angeles is illustrated with a
			juxtaposition of two transient communities: Airbnb renters and the homeless.
		</p>
	</div>
</div>

<section class="intro-images">
	<div class="intro__col">
		<h3>Airbnb Renters: The Transient Traveler</h3>
		<figure>
			<img
				class="responsive-image"
				src="https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2FAirbnb.jpg"
			/>
			<caption>
				Airbnb listings often play off of this imagined Los Angeles. Image: Curbed LA/Frederic J.
				Brown/AFP/Getty Images
			</caption>
		</figure>
	</div>
	<div class="intro__col">
		<h3>Homeless: The Transient Vagabond</h3>

		<figure>
			<img
				class="responsive-image"
				src="https://cdn.glitch.com/48204e47-9ee8-4828-954c-c495450f3d3d%2Fhomeless_CurbedLA.jpg"
			/>
			<caption>
				Airbnb listings often play off of this imagined Los Angeles. Image: Airbnb.com
			</caption>
		</figure>
	</div>
</section>

<section class="instructions">
	<p>
		In each neighborhood of the City of Los Angeles, we plotted the density of Airbnb units against
		the density of homeless encampments reported from 311 calls.
	</p>
	<p>Scroll to zoom in and out of the plot, and mouseover a point to see the density values.</p>
	<p>Density is defined as 1 unit per acre.</p>
	<h3>Density of Airbnb rentals vs. homeless encampment reports</h3>
	<div class="overview-scatter-container">
		<div class="overview-scatter-embed" />
	</div>
</section>

<style>
	.title-card {
		backdrop-filter: blur(1px);
		color: var(--c-red);
		display: flex;
		flex-direction: column;
		font-size: var(--font-h1);
		justify-content: center;
		line-height: 0.9;
		max-width: 100%;
		min-height: 100vh;
		mix-blend-mode: multiply;
		padding: var(--margin-mobile);
	}

	.title-card__title {
		font-family: var(--font-data);
		font-size: 2rem;
		font-weight: 700;
		padding-bottom: 1rem;
		text-transform: uppercase;
	}

	.byline {
		font-family: var(--font-headings-serif);
		font-size: 1.35rem;
		line-height: 1.1;
		margin-top: 1rem;
	}

	.story-title {
		font-size: var(--font-h1);
	}

	.intro-container {
		background: rgba(255, 255, 255, 1);
		margin: 0;
		padding: 1rem;
		display: block;
	}

	.intro-images {
		background: rgba(255, 255, 255, 1);
		display: grid;
		padding: var(--margin-mobile);
		grid-gap: 1rem;
	}

	.instructions {
		background: rgba(255, 255, 255, 1);
		background: linear-gradient(
			180deg,
			rgba(255, 255, 255, 1) 0%,
			rgba(255, 255, 255, 0.8) 90%,
			rgba(255, 255, 255, 0) 100%
		);
		display: flex;
		flex-direction: column;
		margin-bottom: 50vh;
		min-height: 50vh;
		padding-bottom: 25vh;
		padding: var(--margin-mobile);
		position: relative;
		max-width: 100%;
		overflow: hidden;
	}

	.overview-scatter-container {
		display: flex;
		height: 60vh;
		width: 100%;
	}

	@media screen and (min-width: 600px) {
		.story-title {
			font-size: 4rem;
			line-height: 1.15;
		}

		.intro-container {
			padding: var(--margin);
		}

		.intro-images {
			grid-template-columns: 50% 50%;
			padding: var(--margin);
		}

		.instructions {
			padding: var(--margin-mobile);
		}
		.overview-scatter-container {
			padding: var(--margin-mobile);
		}
	}
</style>
