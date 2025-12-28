<script lang="ts">
import { onMount } from 'svelte';
import { page } from '$app/stores';
import { navigating } from '$app/stores';
import { language } from '$lib/store/main.svelte.ts';
import { registerEvent } from '$lib/functions/registerEvent';
import { PortableText } from '@portabletext/svelte';

import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

import InternalLink from '$lib/renderedComponents/InternalLink.svelte';
import ExternalLink from '$lib/renderedComponents/ExternalLink.svelte';
import File from '$lib/renderedComponents/File.svelte';
import Image from '$lib/renderedComponents/Image.svelte';
import Faqs from '$lib/renderedComponents/Faqs.svelte';
import NormalParagraph from '$lib/renderedComponents/NormalParagraph.svelte';
import GeoJson from '$lib/renderedComponents/GeoJson.svelte';
import OpeningHours from '$lib/renderedComponents/OpeningHours.svelte';
import Button from '$lib/renderedComponents/Button.svelte';
import Hub from '$lib/renderedComponents/Hub.svelte';
import HubQueryBased from '$lib/renderedComponents/HubQueryBased.svelte';
import SimpleParagraph from '$lib/renderedComponents/SimpleParagraph.svelte';
import ParkingArea from '$lib/renderedComponents/ParkingArea.svelte';
import Warning from '$lib/renderedComponents/Warning.svelte';
import Table from '$lib/renderedComponents/Table.svelte';

import BannerBuyPDF from '$lib/renderedComponents/BannerBuyPDF.svelte';
import BannerBuyDigitalGuide from '$lib/renderedComponents/BannerBuyDigitalGuide.svelte';
import SimpleBannerBuyDigitalGuide from '$lib/renderedComponents/SimpleBannerBuyDigitalGuide.svelte';

let { content, hasDigitalGuide } = $props();

onMount(async () => {
  registerEvent($page.url.href, "page_view", true, {});
  language.set($page.url.pathname.split('/')[1]);
});

$effect(() => {
  if($navigating?.to) {
    if ($page.url.pathname != $navigating.to.url.pathname) {
      registerEvent(
        $page.url.href, 
        "internalLink", 
        false, 
        {
          "to": $navigating.to.params?.page
        }
      );
    }
  }
});

</script>

<Breadcrumbs/>

{#if !hasDigitalGuide}
{#if content.intro}
<div class="my-6 sm:my-10 mx-auto py-2 sm:py-4 max-w-6xl px-4 sm:px-6 lg:px-8">
  <div class="my-6 sm:my-10 mx-auto py-2 sm:py-4 max-w-6xl px-4 sm:px-6 lg:px-8">
    <div class="text-gray-high text-lg md:text-2xl leading-relaxed mx-auto prose prose-lg" id="intro">
      {@html content.intro}
    </div>
  </div>
</div>
{/if}
{/if}

<main class="mx-auto w-6/7 md:w-3/4">
  <article class="text-left">
    <PortableText
      value={content.text}
      components={{
        types: {
          imageCustom: Image,
          file: File,
          faqs: Faqs,
          geojson: GeoJson,
          openingHours: OpeningHours,
          button: Button,
          hub: Hub,
          hubQueryBased: HubQueryBased,
          simpleParagraph: SimpleParagraph,
          parkingArea: ParkingArea,
          warning: Warning,
          table: Table,
          bannerBuyPDF: BannerBuyPDF,
          bannerBuyDigitalGuide: BannerBuyDigitalGuide,
          simpleBannerBuyDigitalGuide: SimpleBannerBuyDigitalGuide
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

<style>

</style>
