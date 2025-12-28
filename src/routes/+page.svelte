<script lang="ts">
import { goto } from '$app/navigation';
import { onMount } from 'svelte';
onMount(() => {
  goto("/it")
});
</script>

<svelte:head>
  <meta charset="UTF-8">
  <title>Benvenuti in Valpiccola</title>
  <link rel="canonical" href="https://www.valpiccola.com">
  <link rel="alternate" hreflang="it">
  <meta name="robots" content="index, follow">
  <meta name="keyword" content="valpiccola, lake maggiore, digital platform, tourism, innovation, tradition">
  <meta name="description" content="Valpiccola is the 1st digital platform for Lake Maggiore. We enhance virtuous territories with the perfect blend of digital innovation & tradition">
  <meta name="author" content="Valpiccola Team">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta property="og:site_name" content="Valpiccola"/>
  <meta property="og:title" content="Benvenuti in Valpiccola"/>
  <meta property="og:description" content="Valpiccola is the 1st digital platform for Lake Maggiore. We enhance virtuous territories with the perfect blend of digital innovation & tradition"/>
  <meta property="og:url" content="https://www.valpiccola.com"/>
  <meta property="og:image"
  content="https://cdn.sanity.io/images/4i32rs2e/production/c2ec3e4c98c3b4c69405665bee8aecfaf0933375-600x600.png?h=630&w1200&fit=crop"/>
  <meta property="og:type" content="website"/>
  <meta property="og:locale" content="en"/>
  <meta name="twitter:card" content="summary"/>
  <meta name="twitter:site" content="@piccola_val"/>
  <meta name="twitter:creator" content="@piccola_val"/>
</svelte:head>
