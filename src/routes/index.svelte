<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Map from '$lib/map/Map.svelte';
	import Intro from '../lib/Intro.svelte';
	import LandmarkAnnotation from '../lib/LandmarkAnnotation.svelte';
	import LandmarkNeighborhood from '../lib/LandmarkNeighborhood.svelte';
	import Appendix from '../lib/Appendix.svelte';
	import MapLegend from '../lib/map/MapLegend.svelte';
	import { mapElement } from '../lib/store';
	import { throttle } from 'lodash-es';
	import { onMount } from 'svelte';

	import { fromLonLat } from 'ol/proj.js';

	onMount(async () => {
		// const waypoints = ['#ktown', '#hollywood', '#venice']

		function flyMapTo(map, coords, zoom = 14) {
			// Fly map shorthand function
			const view = map.getView();
			view.animate({
				center: fromLonLat(coords),
				duration: 2500,
				zoom: zoom ?? 14
			});
		}

		const intersectCallback = throttle(({ coordinates, zoom }) => {
			if ($mapElement) {
				flyMapTo($mapElement, coordinates, zoom);
			}
		}, 500);

		function createObserver(node: Element) {
			const observer = new IntersectionObserver(
				(entries) => {
					for (let entry of entries) {
						if (entry.isIntersecting) {
							const { target } = entry;
							// run callback
							const areaId = target.getAttribute('data-area-id');
							const coordinates = JSON.parse(target.getAttribute('data-coords'));
							const zoom = target.getAttribute('data-zoom');

							try {
								intersectCallback({ coordinates, zoom });
								// value.flyMapTo(areaId, coordinates, zoom);
							} catch (e) {
								console.error(e);
							}
						}
					}
				},
				{
					rootMargin: '0px',
					threshold: 0.2
				}
			);
			// subscribe node to observer
			observer.observe(node);
		}
		document.querySelectorAll(`.scroll-trigger`).forEach((node) => {
			createObserver(node);
		});
	});
</script>

<svelte:head>
	<title>Homelessness in the City of Angels: A Data Story</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div>
	<Map />
	<MapLegend />
	<Intro />
	<LandmarkNeighborhood
		areaTitle="Koreatown: A Multifaceted Cultural Enclave"
		areaId="ktown"
		visUrl="/data/ktown-airbnb.csv"
		coords={[-118.30073833465576, 34.05776160573775]}
		zoom={16}
	>
		<div slot="quote">
			<blockquote>
				“Hollywood is a place where they'll pay you a thousand dollars for a kiss and fifty cents
				for your soul.”
			</blockquote>
			<cite>―Marilyn Monroe, Actress</cite>
		</div>
		<p slot="intro">
			Hollywood made the city world-famous. In the early 1900s, filmmakers began moving to the Los
			Angeles area to escape the rigorous rules imposed by Thomas Edison’s Motion Picture Patents
			Company in New Jersey. The famous Hollywood sign was erected in 1923 as “Hollywoodland” to
			advertise for a new housing development, and the “Hollywood Walk of Fame” was built soon after
			in 1956. It currently has well over 2,000 names added to the star-studded sidewalk for
			contributing to the entertainment industry (SMExpress, 2019).
		</p>
	</LandmarkNeighborhood>

	<LandmarkAnnotation
		coords={[-118.29195141792297, 34.061779137567214]}
		zoom={18}
		areaId="ktown-annotation"
	>
		<span slot="title"> Homelessness encampments are often reported along roads. </span>
		<p slot="body">
			Many of the homeless encampment reportings follow the major roads such as Wilshire Blvd. There
			appears to be a cluster of Airbnb listings in the southern and southeastern corners of K-town.
		</p>
	</LandmarkAnnotation>

	<LandmarkNeighborhood
		areaTitle="Hollywood: Home of the Stars"
		areaId="hollywood"
		coords={[-118.330135345459, 34.1016774615434]}
		visUrl="/data/hollywood-airbnb.csv"
		zoom={15}
	>
		<span slot="title">Hollywood: Home of the Stars</span>
		<div slot="quote">
			<blockquote>
				“Hollywood is a place where they'll pay you a thousand dollars for a kiss and fifty cents
				for your soul.”
			</blockquote>
			<cite>―Marilyn Monroe, Actress</cite>
		</div>
		<p slot="intro-p">
			Hollywood made the city world-famous. In the early 1900s, filmmakers began moving to the Los
			Angeles area to escape the rigorous rules imposed by Thomas Edison’s Motion Picture Patents
			Company in New Jersey. The famous Hollywood sign was erected in 1923 as “Hollywoodland” to
			advertise for a new housing development, and the “Hollywood Walk of Fame” was built soon after
			in 1956. It currently has well over 2,000 names added to the star-studded sidewalk for
			contributing to the entertainment industry (SMExpress, 2019).
		</p>
	</LandmarkNeighborhood>

	<LandmarkAnnotation
		areaId="hollywood-annotation"
		coords={[-118.3399200439453, 34.10100227884199]}
		zoom={16}
	>
		<span slot="title">The Hollywood Walk of Fame</span>
		<p slot="body">
			The main strip of Hollywood Boulevard sees a large concentration of Airbnb rentals surrounding
			the corridor, while there are very few homeless encampment reports. Since the Walk of Fame is
			a highly-trafficked tourist destination, could this void in homelessness encampments be
			explained by sweeps and clearings?
		</p>
	</LandmarkAnnotation>

	<LandmarkNeighborhood
		areaTitle="Venice: A creative paradise"
		areaId="venice"
		coords={[-118.46677780151366, 33.99539435637889]}
		visUrl="/data/venice-airbnb.csv"
		zoom={15}
	>
		<div slot="quote">
			<blockquote>
				Venice Beach is a combination of the tacky, the mindless, the ironic, and the novel.
			</blockquote>
			<cite>―Freelance Dionysian (VirtualVenice)</cite>
		</div>
		<p slot="intro-p">
			Originally called "Venice of America," Venice was founded in 1905 by tobacco millionaire Abbot
			Kinney as a 14-mile beach resort town (LAist, 2018). Inspired by the enchantment of Venice,
			Italy, Kinney unveiled the resort town and amusement park to 40,000 visitors. The park
			featured Italian gondoliers poling their boats down fairy-lit canals, a concert orchestra
			supplying music that could be heard nearly all over town, camel rides, exotic hotels catering
			to the best tastes, and a miniature railroad circling the entire scene (LA Times, 1998). This
			vibrant atmosphere continues today (Venice, 2019).
		</p>
	</LandmarkNeighborhood>

	<LandmarkAnnotation
		areaId="venice-annotation"
		zoom={16}
		coords={[-118.47379446029662, 33.98735281410265]}
	>
		<span slot="title">Waterfront vacation spots</span>
		<p slot="body">
			Venice is the neighborhood with the highest density of Airbnb rentals per acre in Los Angeles,
			this is clearly seen with the high concentration of Airbnb vacation rentals along the
			beachfront.
		</p>
	</LandmarkAnnotation>

	<Appendix />
</div>

<style>
</style>
