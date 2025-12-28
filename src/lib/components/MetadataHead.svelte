<script lang="ts">
import { language } from '$lib/store/main.svelte.ts';
import { page } from '$app/stores';
import { PUBLIC_SANITY_CDN } from '$env/static/public';

let { metadata, translations } = $props();

// Base URL
const baseUrl = 'https://www.valpiccola.com';

// URL utility functions
function normalizeSlug(slug) {
  if (!slug) return '/';
  return slug.startsWith('/') ? slug : `/${slug}`;
}

function getFullUrl(slug) {
  const normalizedSlug = decodeURIComponent(normalizeSlug(slug));
  return new URL(normalizedSlug, baseUrl).toString();
}

// Get canonical URL based on the current page and language
const getCanonicalUrl = () => {
  try {
    const slug = $page.url.pathname;
    return getFullUrl(slug);
  } catch (error) {
    console.error('Error generating canonical URL:', error);
    return baseUrl;
  }
};

// Get language alternates with error checking
const getLanguageAlternates = () => {
  const alternates = [];
  try {
    translations.forEach(translation => {
      const url = getFullUrl(translation.slug.current);

      // Add regular hreflang
      alternates.push({
        url,
        hreflang: translation.language.toLowerCase()
      });

      // If this is the Italian version, also add x-default
      if (translation.language.toLowerCase() === 'it') {
        alternates.push({ url, hreflang: 'x-default' });
      }
    });
  } catch (error) {
    console.error('Error generating language alternates:', error);
  }
  return alternates;
};

// Get formatted date for schema
const getFormattedDate = () => {
  try {
    return metadata.lastModified ? new Date(metadata.lastModified).toISOString() : new Date().toISOString();
  } catch {
    return new Date().toISOString();
  }
};
</script>

<svelte:head>
{#if metadata}
  <!-- Essential charset and viewport -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  
  <!-- Title -->
  <title>{metadata.metaTitle}</title>
  
  <!-- Canonical URL -->
  <link rel="canonical" href={getCanonicalUrl()}>
  
  <!-- Language alternates -->
  {#each getLanguageAlternates() as alternate}
    <link rel="alternate" href={alternate.url} hreflang={alternate.hreflang}>
  {/each}
  
  <!-- Basic SEO meta tags -->
  <meta http-equiv="content-language" content={$language}>
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="description" content={metadata.metaDescription}>
  <meta name="keywords" content={metadata.metaKeyword || ''}>
  <meta name="author" content="Valpiccola Team">
  
  <!-- Additional SEO meta tags -->
  <meta name="format-detection" content="telephone=no">
  <meta name="theme-color" content="#ffffff">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  
  <!-- OpenGraph tags with absolute URLs -->
  <meta property="og:site_name" content="Valpiccola">
  <meta property="og:title" content={metadata.metaTitle}>
  <meta property="og:description" content={metadata.metaDescription}>
  <meta property="og:url" content={getCanonicalUrl()}>
  <meta property="og:image" content="{ PUBLIC_SANITY_CDN }/{ metadata.metaImageUrl}?h=630&w1200&fit=crop&auto=format"/>
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:type" content="website">
  <meta property="og:locale" content={$language}>
  
  <!-- Twitter Card tags -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@piccola_val">
  <meta name="twitter:creator" content="@piccola_val">
  <meta name="twitter:title" content={metadata.metaTitle}>
  <meta name="twitter:description" content={metadata.metaDescription}>
  <meta name="twitter:image" content="{ PUBLIC_SANITY_CDN }/{ metadata.metaImageUrl}?h=630&w1200&fit=crop&auto=format"/>
  
{/if}
</svelte:head>

<!-- JSON-LD structured data -->
{@html `
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "${getCanonicalUrl()}",
    "name": "${metadata.metaTitle}",
    "description": "${metadata.metaDescription}",
    "inLanguage": "${$language}",
    "dateModified": "${getFormattedDate()}",
    "publisher": {
      "@type": "Organization",
      "name": "Valpiccola",
      "url": "${baseUrl}"
    }
  }
  </script>
`}
