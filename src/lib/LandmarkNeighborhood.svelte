<script lang="ts">
	import embed from 'vega-embed';
	import { capitalize } from 'lodash-es';
	// import { setupScrollObserver } from './../ScrollEvents';
	import { makePricePlot, makeMiniNights, makePlotRentalType } from './plotStyles';
	import { onMount } from 'svelte';
	import ScrollTrigger from './ScrollTrigger.svelte';

	export let areaTitle: string;
	export let areaId: string;
	export let visUrl: string;
	export let coords: Array<Number>;
	export let zoom: number;

	function renderPlot(areaId, dataUrl) {
		let formattedArea;
		if (areaId === 'ktown') {
			formattedArea = 'Koreatown';
		} else {
			formattedArea = capitalize(areaId);
		}
		return Promise.all(
			[
				embed(`#${areaId}-vis-rental-types`, makePlotRentalType(dataUrl, formattedArea)),
				embed(`#${areaId}-vis-nights`, makeMiniNights(dataUrl, formattedArea)),
				embed(`#${areaId}-vis-price`, makePricePlot(dataUrl, formattedArea))
			],
			(values) => console.log(values)
		);
	}
	onMount(async () => {
		// Take attribute content and put it inside the info span
		renderPlot(areaId, visUrl);
	});
</script>

<section id={areaId} class="landmark">
	<header class="landmark__header">
		<h2 class="landmark__title">
			<ScrollTrigger {areaId} {coords} zoom={zoom ?? 12} />

			<slot name="title">{areaTitle}</slot>
		</h2>
		<p class="lead">
			<slot name="quote" />
		</p>
		<slot name="intro-p">
			<slot name="intro" />
		</slot>
	</header>

	<div class="landmark__container">
		<div class="">
			<figure class="vis-figure">
				<h3>Distribution of room types</h3>
				<div class="vis-container">
					<div id={`${areaId}-vis-rental-types`} />
				</div>
				<details>
					<summary>
						<span class="landmark__vis-title">Rental Types</span>
					</summary>
					<p class="vis-description">
						A transient traveler has many considerations for selecting a rental: the amenities
						offered, the general aesthetic of the living environment, and space needed. This affects
						the choice among the four rental type options. For those without any other choice in the
						City of Los Angeles, more affordable options like tents, vehicles, and shelters housed
						36,165 people in 2019 (LAHSA).
					</p>
				</details>
			</figure>

			<figure class="vis-figure">
				<h3>Distribution of nights stayed</h3>
				<div class="vis-container">
					<div id={`${areaId}-vis-nights`} />
				</div>
				<details>
					<summary>
						<span class="landmark__vis-title"> Minimum Nights</span>
					</summary>
					<p class="vis-description">
						Ranging from one day to a few months, Airbnb hosts can require a minimum number of
						nights a renter could stay in their rental. This offers a preview into the length of
						time a transient traveler might stay in the neighborhood and why they might be visiting,
						whether for long-term work or a short-term vacation. By contrast, 23% of the homeless
						population surveyed experienced homelessness for the first-time that year, whereas
						chronic homelessness increased by 17% (LAHSA, 2019).
					</p>
				</details>
			</figure>

			<figure class="vis-figure">
				<h3>Distribution of rental prices</h3>
				<div class="vis-container">
					<div id={`${areaId}-vis-price`} />
				</div>
				<details>
					<summary>
						<span class="landmark__vis-title"> Daily rate of an Airbnb rental </span>
					</summary>
					<p class="vis-description">
						How much money would a transient traveler pay to visit? In contrast, economic factors
						are the main driver of increases in homelessness and Los Angeles is the least affordable
						housing market in the United States (LAHSA, 2019).
					</p>
				</details>
			</figure>
		</div>
	</div>
</section>

<style>
	.landmark {
		border-top: 1rem solid red;
		background-color: rgba(255, 255, 255, 0.95);
		margin-bottom: 200vh;
		padding: var(--margin-mobile);
	}

	.landmark__title {
		font-size: var(--font-h2);
		margin: 0;
		padding: 0;
		margin-bottom: 1rem;
	}

	:global(.vega-embed, .vis-container) {
		height: 35vh;
		width: 100%;
	}

	.landmark__vis-title {
		font-family: var(--font-data);
		font-weight: 700;
	}

	summary {
		margin-top: 1rem;
	}

	h2,
	h3 {
		font-family: var(--font-headings);
	}

	details {
		margin-bottom: 4rem;
	}

	.vis-description {
		max-width: 45ch;
	}
	.vis-figure {
		display: block;
		margin: 0;
		padding: 0;
	}

	@media screen and (min-width: 600px) {
		.landmark {
			padding: var(--margin-mobile);
		}
		.landmark__title {
			font-size: 2rem;
			line-height: 1.1;
		}
		.landmark__vis-title {
			font-family: var(--font-headings);
		}
	}

	@media screen and (min-width: 900px) {
		.landmark {
			max-width: 55ch;
			padding: calc(var(--margin) / 2);
		}
	}
</style>
