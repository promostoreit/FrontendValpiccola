<script lang="ts">
import { onMount } from 'svelte';
import { 
  isMenuOpen,
  translations,
  navbar,
  footer
 } from '$lib/store/main.svelte.ts';

import Page from '$lib/components/Page.svelte'
import Event from '$lib/components/Event.svelte'

import Header from '$lib/components/Header.svelte'
import Hero from '$lib/components/Hero.svelte'
import Features from '$lib/components/Features.svelte'
import MetadataHead from '$lib/components/MetadataHead.svelte'
import ScrollMonitor from '$lib/components/ScrollMonitor.svelte'
import Feedback from '$lib/components/Feedback.svelte'
import NewsletterBanner from '$lib/components/NewsletterBanner.svelte'
import Footer from '$lib/components/Footer.svelte'

import GuideCards from '$lib/components/GuideCards.svelte'

let { data } = $props();

let hasProduct = data['base']['hasProduct'];
let hasDigitalGuide = data['base']['hasDigitalGuide'];
let metadata = data['metadata'];
let content = data['content'];
let imageProfile = data['imageProfile'];

onMount(() => {
  translations.set(data['content']['translations']);
  navbar.set(data['navbar']);
  footer.set(data['footer']);
});

</script>

<MetadataHead 
  {metadata}
  translations={data['content']['translations']}
/>

<Header 
  navbar={data['navbar']}
  translations={data['content']['translations']}
  {hasDigitalGuide}
/>

<Hero 
  {hasProduct}
  {hasDigitalGuide}
  {imageProfile}
  {content} 
  {metadata} 
/>

{#if hasDigitalGuide}
  <Features />
{/if}

{#if hasDigitalGuide}
  <GuideCards 
    {content}
  />
{/if}

<ScrollMonitor/>

{#if !$isMenuOpen}

{#if content._type == "page"}
<Page 
  {hasDigitalGuide}
  {content} 
/>
{:else if content._type == "event"}
<Event 
  {content}
/>
{/if}

<NewsletterBanner />
<Feedback />

{#if data.footer}
<Footer footer={data['footer']}/>
{/if}

{/if}
