<script lang="ts">
import { page } from '$app/stores'; // Importing the $page store from SvelteKit
import { onMount } from 'svelte';
import { registerEvent } from '$lib/functions/registerEvent.ts'
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
    [value.map.latitude, value.map.longitude], 
    value.map.zoom
  );
  leaflet.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
  ).addTo(map);
  let active = {
    color: "#021691", 
    fillColor: "#021691",
    onEachFeature: onEachFeature
  }
  leaflet.geoJSON(JSON.parse(value.map.data.code), active).addTo(map);
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

function triggerEvent(event_detail) {
  registerEvent(
    $page.url.href, 
    "click_parking_area_button", 
    false, 
    {
      event_detail: event_detail
    }
  );
}
</script>

<div class="mx-auto bg-gray-low shadow shadow-gray-base p-4 md:p-8 text-gray-dark">
  <div class="mx-auto bg-white p-2 md:p-8">
    <h2 
      class="text-xl md:text-3xl text-left font-bold uppercase mx-8 mt-4"
      id="{ value.title.replace(/\s/g, '_') }" >
      {value.title}
    </h2>
    <div class="text-lg md:text-xl text-left mx-8 mt-4">
      {@html value.intro}
    </div>
    <main class="mx-8 my-8">
      <div class="z-0" bind:this={mapElement}></div>
    </main>
    <div class="flex flex-wrap mx-auto md:w-4/5 text-lg md:text-xl mt-4 md:mt-8 justify-around">
    {#each value.parkSpot as park, index}
      <div class="w-5/6 md:w-2/5 space-y-3 mb-8 md:mx-12 mx-auto">
        <h3 class="font-bold uppercase text-2xl text-center md:text-left">
          {park.title}
        </h3>
        <div class="">
          {park.text}
        </div>
        <div class="flex btn hover:bg-blue-base bg-blue-light w-fit 
                    rounded-lg border-0 shadow underline my-4 mx-auto md:mx-4">
          <a 
            class="text-blue-dark" 
            href="{park.button.link}"
            target="_blank"
            onclick={() => triggerEvent(park.button.event_detail)}>
            {park.button.title}
          </a>
        </div>
      </div>
    {/each}
    </div>
  </div>
</div>

<style>
  @import 'leaflet/dist/leaflet.css';
  main div {
    height: 400px;
    border-radius: 20px;
  }
</style>
