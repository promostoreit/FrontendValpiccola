<script lang="ts">
import { onMount } from 'svelte';
import { page } from '$app/stores';
import { language } from '$lib/store/main.svelte.ts';
import { registerEvent } from '$lib/functions/registerEvent';
import { PortableText } from '@portabletext/svelte'

import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

import InternalLink from '$lib/renderedComponents/InternalLink.svelte'
import ExternalLink from '$lib/renderedComponents/ExternalLink.svelte'
import NormalParagraph from '$lib/renderedComponents/NormalParagraph.svelte'
import Faqs from '$lib/renderedComponents/Faqs.svelte'
import SimpleParagraph from '$lib/renderedComponents/SimpleParagraph.svelte';
import ParkingArea from '$lib/renderedComponents/ParkingArea.svelte';

  let { content } = $props();

onMount(async () => {
  registerEvent($page.url.href, "page_view", true, {});
  language.set($page.url.pathname.split('/')[1]);
});

let eventFocusSection = {
  "it": {
    "toKnow": "Da sapere",
  },
  "en": {
    "toKnow": "To know",
  },
  "de": {
    "toKnow": "Zu wissen",
  },
  "fr": {
    "toKnow": "À savoir",
  }
}

let eventDetails = {
  "it": {
    "startDate": "Inizio",
    "endDate": "Fine",
    "organizer": "Organizzatore",
    "location": "Luogo",
    "price": "Prezzo",
    "program": "Programma",
    "website": "Sito web",
    "links": "Links",
  },
  "en": {
    "startDate": "Start",
    "endDate": "End",
    "organizer": "Organizer",
    "location": "Location",
    "price": "Price",
    "program": "Program",
    "website": "Website",
    "links": "Links"
  },
  "de": {
    "startDate": "Start",
    "endDate": "Ende",
    "organizer": "Organisator",
    "location": "Ort",
    "price": "Preis",
    "program": "Programm",
    "website": "Website",
    "links": "Links"
  },
  "fr": {
    "startDate": "Début",
    "endDate": "Fin",
    "organizer": "Organisateur",
    "location": "Lieu",
    "price": "Prix",
    "program": "Programme",
    "website": "Site web",
    "links": "Links"
  }
}
</script>

<Breadcrumbs/>

<h3 class="text-xl md:text-2xl text-gray-dark w-2/3 mx-auto mt-8 mb-12">
  {content.intro}
</h3>

<div class="bg-blue-low p-[1px] w-11/12 md:w-3/4 mx-auto rounded-2xl my-8 shadow">
  <div class="bg-green-light p1 md:p-4 mx-auto rounded-2xl">
    <h2 class="text-xl md:text-3xl font-bold uppercase w-5/6 mx-auto pt-4 md:pt-8 text-gray-dark text-center">
      {eventFocusSection[$language].toKnow}
    </h2>
    <div class="mx-auto p-2 flex flex-wrap mt-2 md:mt-4 overflow-hidden text-gray-dark justify-center">
      {#if content.startDate && content.startDate.value}
      <div class="flex flex-col bg-blue-light rounded-2xl shadow border-b-2 border-r-2 border-blue-low p-4 md:p-6 py-4 space-y-1 m-2 sm:m-4">
        <div class="flex flex-row align-middle items-center justify-center space-x-2">
          <img 
            class="w-4 md:w-6 h-4 md:h-6"
            src="/calendar-icon.png" 
            alt="Calendar icon" 
            title="Calendar icon"
          />
          <h3 class="font-semibold text-sm md:text-lg text-left">
            {eventDetails[$language].startDate}
          </h3>
        </div>
        <div class="text-center text-md md:text-2xl">
          {content.startDate.value}
        </div>
      </div>
      {/if}
      {#if content.endDate && content.endDate.value}
      <div class="flex flex-col bg-blue-light rounded-2xl shadow border-b-2 border-r-2 border-blue-low p-4 md:p-6 py-4 space-y-1 m-2 sm:m-4">
        <div class="flex flex-row align-middle items-center justify-center space-x-2">
          <img 
            class="w-4 md:w-6 h-4 md:h-6"
            src="/calendar-icon.png" 
            alt="Calendar icon" 
            title="Calendar icon"
          />
          <h3 class="font-semibold text-sm md:text-lg text-left">
            {eventDetails[$language].endDate}
          </h3>
        </div>
        <div class="text-center text-md md:text-2xl">
          {content.endDate.value}
        </div>
      </div>
      {/if}
      {#if content.organizer && content.organizer.value}
      <div class="flex flex-col bg-blue-light rounded-2xl shadow border-b-2 border-r-2 border-blue-low p-4 md:p-6 py-4 space-y-1 m-2 sm:m-4">
        <div class="flex flex-row align-middle items-center justify-center space-x-2">
          <img 
            class="w-4 md:w-6 h-4 md:h-6"
            src="/organizer-icon.png"
            alt="Organizer icon"
            title="Organizer icon"
          />
          <h3 class="font-semibold text-sm md:text-lg text-left">
            {eventDetails[$language].organizer}
          </h3>
        </div>
        <div class="text-center text-md md:text-2xl">
          {content.organizer.value}
        </div>
      </div>
      {/if}
      {#if content.location && content.location.value}
      <div class="flex flex-col bg-blue-light rounded-2xl shadow border-b-2 border-r-2 border-blue-low p-4 md:p-6 py-4 space-y-1 m-2 sm:m-4">
        <div class="flex flex-row align-middle items-center justify-center space-x-2">
          <img 
            class="w-4 md:w-6 h-4 md:h-6"
            src="/place-icon.png"
            alt="Place icon"
            title="Place icon"
          />
          <h3 class="font-semibold text-sm md:text-lg text-left">
            {eventDetails[$language].location}
          </h3>
        </div>
        <div class="text-center text-md md:text-2xl">
          {content.location.value}
        </div>
      </div>
      {/if}
      {#if content.price && content.price.value}
      <div class="flex flex-col bg-blue-light rounded-2xl shadow border-b-2 border-r-2 border-blue-low p-4 md:p-6 py-4 space-y-1 m-2 sm:m-4">
        <div class="flex flex-row align-middle items-center justify-center space-x-2">
          <img 
            class="w-4 md:w-6 h-4 md:h-6"
            src="/price-icon.png"
            alt="Price icon"
            title="Price icon"
          />
          <h3 class="font-semibold text-sm md:text-lg text-left">
            {eventDetails[$language].price}
          </h3>
        </div>
        <div class="text-center text-md md:text-2xl">
          {content.price.value}
        </div>
      </div>
      {/if}
      {#if content.website && content.website.value}
      <div class="flex flex-col bg-blue-light rounded-2xl shadow border-b-2 border-r-2 border-blue-low p-4 md:p-6 py-4 space-y-1 m-2 sm:m-4">
        <a href={content?.website?.value} target="_blank" rel="noopener noreferrer">
          <div class="flex flex-row align-middle items-center justify-center space-x-2">
            <img 
              class="w-4 md:w-6 h-4 md:h-6"
              src="/website-icon.png"
              alt="Website icon"
              title="Website icon"
            />
            <h3 class="font-semibold text-sm md:text-lg text-left">
              {eventDetails[$language].website}
            </h3>
          </div>
          <div class="text-center text-md md:text-2xl underline text-blue-deep">
            {content?.website?.value}
          </div>
        </a>
      </div>
      {/if}
      {#if content.program && content.program.value}
      <div class="flex flex-col bg-blue-light rounded-2xl shadow border-b-2 border-r-2 border-blue-low p-4 md:p-6 py-4 space-y-1 m-2 sm:m-4">
        <div class="flex flex-row align-middle items-center justify-center space-x-2">
          <img 
            class="w-4 md:w-6 h-4 md:h-6"
            src="/theater-icon.png"
            alt="Theater icon"
            title="Theater icon"
          />
          <h3 class="font-semibold text-sm md:text-lg text-left">
            {eventDetails[$language].program}
          </h3>
        </div>
        <div class="text-left text-md md:text-2xl">
          {@html content.program.value}
        </div>
      </div>
      {/if}
    </div>
  </div>
</div>

<main class="mx-auto">
  <article class="text-left">
    <PortableText
      value={content.text}
      components={{
        types: {
          simpleParagraph: SimpleParagraph,
          parkingArea: ParkingArea,
          faqs: Faqs
        },
        marks: {
          link: ExternalLink,
          internalLink: InternalLink,
        },
        block: {
          normal: NormalParagraph,
          h1: NormalParagraph,
          h2: NormalParagraph,
          h3: NormalParagraph,
          blockquote: NormalParagraph,
        },
        list: {
          bullet: NormalParagraph
        }
      }}
    />
  </article>
</main>
