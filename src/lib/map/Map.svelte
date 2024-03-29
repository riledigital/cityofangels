<script>
	import { onMount } from 'svelte';
	import 'ol/ol.css';

	import { Map, View } from 'ol';
	import { fromLonLat } from 'ol/proj.js';
	import GeoJSON from 'ol/format/GeoJSON.js';
	import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
	import { Vector as VectorSource } from 'ol/source.js';
	import { styleFunctionRentals, styleFunctionReports, styleFunctionBounds } from './MapStyles.js';
	import XYZ from 'ol/source/XYZ.js';

	const COORDS = {
		start: [-118.22181701660156, 34.04298753935195],
		ktown: [-118.30073833465576, 34.05776160573775],
		'ktown-annotation': [-118.29195141792297, 34.061779137567214],
		hollywood: [-118.330135345459, 34.1016774615434],
		'hollywood-annotation': [-118.3399200439453, 34.10100227884199],
		venice: [-118.46677780151366, 33.99539435637889],
		'venice-annotation': [-118.47379446029662, 33.98735281410265],
		nyc: [-73.96046251058578, 40.80807627279606]
	};

	const geoJsonUrls = [
		'/data/ktown-airbnb.geojson',
		'/data/hollywood-airbnb.geojson',
		'/data/venice-airbnb.geojson'
	];

	const geoJsonReports = [
		'/data/ktown-311.geojson',
		'/data/hollywood-311.geojson',
		'/data/venice-311.geojson'
	];

	const fetchParseGeojson = function (url, type) {
		return fetch(url)
			.then((resp) => resp.json())
			.then((data) => {
				const vectorSource = new VectorSource({
					features: new GeoJSON().readFeatures(data, {
						featureProjection: 'EPSG:3857'
					})
				});

				const TYPES = {
					rentals: styleFunctionRentals,
					reports: styleFunctionReports,
					bounds: styleFunctionBounds
				};
				// EPSG:3857
				const vectorLayer = new VectorLayer({
					source: vectorSource,
					style: TYPES[type]
				});
				return vectorLayer;
			});
	};

	const view = new View({
		center: fromLonLat(COORDS['start']),
		zoom: 8
	});

	const attrib =
		'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>';
	const SOURCE_CARTO = new XYZ({
		attributions: attrib,
		url: 'https://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png',
		tileSize: 512
	});

	const LAYER_CARTO = new TileLayer({
		source: SOURCE_CARTO
	});

	const setupMap = function () {
		return Promise.all([
			Promise.all(geoJsonUrls.map((d) => fetchParseGeojson(d, 'rentals'))),
			Promise.all(geoJsonReports.map((d) => fetchParseGeojson(d, 'reports'))),
			fetchParseGeojson('/data/neighborhood-boundaries.geojson', 'bounds')
		]).then((values) => {
			const map = new Map({
				target: 'map',
				layers: [LAYER_CARTO, ...[...values[0], ...values[1]], values[2]],
				view: view
			});

			return map;
		});
	};

	// const mainMap = setupMap();
	import { mapElement } from './../store';
	onMount(async () => {
		mapElement.set(await setupMap());
	});
</script>

<div id="map" />

<style>
	#map {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;

		z-index: -1;
	}
</style>
