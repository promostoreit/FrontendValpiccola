<script lang="ts">
  import { onMount } from 'svelte';
  import type {CustomBlockComponentProps} from '$lib/rendererTypes'
  interface Props {
    portableText: CustomBlockComponentProps;
  }

  let { portableText }: Props = $props();
  let {value} = $derived(portableText)
  let mapElement = $state();
  let map;
  onMount(async () => {
    const leaflet = await import('leaflet');
    map = leaflet.map(
      mapElement, 
      {attributionControl: false}
    ).setView(
      [value.latitude, value.longitude], 
      value.zoom
    );
    leaflet.tileLayer(
      'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
    ).addTo(map);
    let active = {
      color: "#021691", 
      fillColor: "#021691",
      onEachFeature: onEachFeature
    }
    leaflet.geoJSON(JSON.parse(value.data.code), active).addTo(map);
  });
  function onEachFeature(feature, layer) {
    let name = feature.properties.name;
    if (name) {
      layer.bindPopup(`${name}`);
      layer.on('mouseover', function (e) {
          this.openPopup(e.latlng);
      });
      layer.on('mouseout', function (e) {
        setTimeout(() => {  this.closePopup(); }, 1000);
      });
    }
  }
</script>

<div class="bg-white p-2 md:p-8 text-gray-dark">
  <h2 
    class="text-xl md:text-3xl text-left font-bold uppercase w-4/5 mx-auto mt-4 md:mt-12"
    id="{ value.title.replace(/\s/g, '_') }" >
    {value.title}
  </h2>
  <main class="mx-8 md:mx-60 my-8">
    <div class="z-0" bind:this={mapElement}></div>
  </main>
</div>

<style>
  @import 'leaflet/dist/leaflet.css';
  main div {
    height: 400px;
  }
</style>
