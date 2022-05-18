<script lang="ts">
	import { onMount } from 'svelte';
	import ScrollTrigger from './ScrollTrigger.svelte';

	// import {
	//   setupScrollObserver as scrollSetup
	// } from './../ScrollEvents';
	export let areaId: string;
	export let coords: Array<Number>;
	export let zoom: Number;

	onMount(
		async () => {}
		// scrollSetup(areaId, zoomLevel);
	);
</script>

<section class="landmark-annotation">
	<ScrollTrigger {areaId} {coords} zoomLevel={zoom ?? 12} />
	<h3 class="title">
		<slot name="title" />
	</h3>
	<p>
		<slot name="body" />
	</p>
</section>

<style>
	.landmark-annotation {
		border-top: 1rem solid red;
		background-color: var(--c-red);
		color: var(--c-white);
		margin-bottom: 100vh;
		padding: var(--margin-mobile);
	}

	.title {
		margin: 0;
		padding: 0;
		font-size: var(--font-h3);
		line-height: 1.2;
		max-width: 30ch;
	}

	h2,
	h3 {
		font-family: var(--font-headings);
	}

	@media screen and (min-width: 600px) {
		.landmark-annotation {
			max-width: 55ch;
			padding: var(--margin-landmarks);
		}
		.title {
		}
	}

	@media screen and (min-width: 900px) {
		.landmark-annotation {
			padding: var(--margin-landmarks);
		}
	}
</style>
