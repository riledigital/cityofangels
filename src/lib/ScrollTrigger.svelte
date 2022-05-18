<script lang="ts">
	export let areaId: string;
	export let coords: Array<Number>;
	export let zoom: Number;
</script>

<div
	class="scroll-trigger"
	id={`#trigger-${areaId}`}
	data-coords={JSON.stringify(coords)}
	data-area-id={areaId}
	data-zoom={zoom}
/>
