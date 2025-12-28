<script lang="ts">
  import { language } from '$lib/store/main.svelte.ts';
  import { registerEvent } from '$lib/functions/registerEvent';
  import { page } from '$app/stores';
  export let content;

  let categories = content.text?.[0]?.guideCards?.categories ?? [];

  // Track active category and expanded cards
  let activeCategory = 0;
  
  // For responsive design
  let isMobile = false;
  
  // Update on mount and window resize
  import { onMount } from 'svelte';
  
  onMount(() => {
    const checkMobile = () => {
      isMobile = window.innerWidth < 768;
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  });

  // Function to scroll to purchase section
  function scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      
      // Register event for analytics
      registerEvent(
        $page.url.href,
        "clicked_guide_card_buy_button",
        true,
        {
          target_section: id,
          active_category: categories[activeCategory]?.name
        }
      );
    }
  }

  const languageSentence = {
    "it": {
      "aboveTitle": "Un piccolo estratto",
      "title": "Ecco un'anticipazione della guida",
      "more": "Vuoi scoprire di più?",
      "moreSentence": "Questa è solo un'anteprima. Ottieni mappe, consigli esclusivi e tanto altro con la guida completa.",
      "buy": "Acquista la guida",
      "openInGoogleMaps": "Apri in Google Maps"
    },
    "en": {
      "aboveTitle": "A small excerpt",
      "title": "Here's a preview of the guide",
      "more": "Want to know more?",
      "moreSentence": "This is just a preview. Get maps, exclusive tips and more with the complete guide.",
      "buy": "Buy the guide",
      "openInGoogleMaps": "Open in Google Maps"
    },
    "de": {
      "aboveTitle": "Ein kleines Extrakt",
      "title": "Hier ist eine Vorschau der Guide",
      "more": "Möchten Sie mehr erfahren?",
      "moreSentence": "Dies ist nur eine Vorschau. Erhalten Sie Karten, exklusive Tipps und vieles mehr mit der vollständigen Guide.",
      "buy": "Guide kaufen",
      "openInGoogleMaps": "In Google Maps öffnen"
    },
    "fr": {
      "aboveTitle": "Un petit extrait",
      "title": "Voici une prévisualisation de la guide",
      "more": "Voulez-vous en savoir plus?",
      "moreSentence": "C'est juste une prévisualisation. Obtenez des cartes, des conseils exclusifs et bien plus avec la guide complète.",
      "buy": "Acheter la guide",
      "openInGoogleMaps": "Ouvrir dans Google Maps"
    }
  }

</script>

{#if categories && categories.length > 0}
<div class="bg-white pt-16 sm:pt-24">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-base/7 font-semibold text-blue-high">
        {languageSentence[$language].aboveTitle}
      </h2>
      <p class="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl text-balance">
        {languageSentence[$language].title}
      </p>
    </div>

    <div class="w-full mt-8 sm:mt-16 max-w-6xl mx-auto p-4">
    
      <!-- Desktop Category Tabs -->
      <div class="hidden md:flex space-x-2 overflow-x-auto pb-2">
        {#each categories as category, index}
          <button
            on:click={() => activeCategory = index}
            class="px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap {index === activeCategory ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
          >
            {category.name}
          </button>
        {/each}
      </div>
      
      <!-- Mobile Category Selector -->
      <div class="md:hidden mb-4">
        <div class="relative">
          <select 
            bind:value={activeCategory}
            class="w-full p-3 bg-gray-100 rounded-lg appearance-none pr-10 font-medium text-gray-800 border border-gray-200"
          >
            {#each categories as category, index}
              <option value={index}>{category.name}</option>
            {/each}
          </select>
          <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Location Cards -->
    {#if categories[activeCategory] && categories[activeCategory].locations}
    
    <!-- Mobile: Horizontal scrollable cards - Breaking out of parent container -->
    <div class="md:hidden -mx-6 lg:-mx-8">
      <div class="flex gap-4 overflow-x-scroll pb-4 snap-x snap-mandatory scrollbar-hide pl-4" style="scroll-padding: 1rem;">
        {#each categories[activeCategory].locations as location, locationIndex}
          {@const locationId = `${activeCategory}-${locationIndex}`}
          
          <div class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden flex-shrink-0 w-72 snap-start">
            <!-- Card Header -->
            <div class="p-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
              <div class="flex justify-between items-center">
                <div class="min-w-0 flex-1">
                  <h3 class="font-bold text-lg truncate">{location.title}</h3>
                </div>
              </div>
            </div>
            
            <!-- Card Content -->
            <div class="p-4">
              <!-- Description -->
              <p class="text-gray-700 mb-3 text-sm leading-relaxed">{location.description}</p>
              
              <!-- Rating -->
              {#if location.rating}
                <div class="flex items-center mb-3">
                  <div class="flex">
                    {#each Array(5) as _, i}
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 {i < Math.floor(location.rating) ? 'text-amber-500' : 'text-gray-300'}" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    {/each}
                  </div>
                  <span class="text-gray-600 text-xs ml-2 truncate">{location.rating} ({location.reviewCount} recensioni)</span>
                </div>
              {/if}

              <div class="mt-4 pt-4 border-t border-gray-100 space-y-3">
                {#if location.address}
                  <div class="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span class="text-gray-700 text-sm break-words">{location.address}</span>
                  </div>
                {/if}
                
                {#if location.phone}
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href={`tel:${location.phone}`} class="text-blue-base hover:underline text-sm truncate">{location.phone}</a>
                  </div>
                {/if}
                
                {#if location.website}
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s1.343-9-3-9m-9 9a9 9 0 919-9" />
                    </svg>
                    <a href={location.website} target="_blank" rel="noopener noreferrer" class="text-blue-base hover:underline text-sm truncate">Visit Website</a>
                  </div>
                {/if}
                
                <div class="mt-4">
                  {#if location.cid}
                    <a 
                      href={`https://www.google.com/maps?cid=${location.cid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="w-full py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 rounded-md transition-colors flex items-center justify-center text-sm"
                    >
                      <img src="/google-maps-logo.png" alt="Google Maps" class="h-4 w-4 mr-2">
                      <span class="truncate">{languageSentence[$language].openInGoogleMaps}</span>
                    </a>
                  {/if}
                </div>
              </div>
            </div>
          </div>
        {/each}

        <!-- Mobile Teaser Card -->
        <div class="teaser-card flex flex-col justify-center items-center bg-yellow-50 border border-yellow-300 p-4 rounded-xl shadow-md text-center flex-shrink-0 w-72 snap-start">
          <div class="max-w-full">
            <h3 class="text-lg font-bold mb-1">
              {languageSentence[$language].more}
            </h3>
            <p class="text-gray-700 text-sm mb-3 break-words">
              {languageSentence[$language].moreSentence}
            </p>
            <button 
              on:click|preventDefault={() => scrollToSection('buyPDFBanner')}
              class="inline-block bg-yellow-600 text-white px-4 py-2 text-sm rounded hover:bg-yellow-700 transition cursor-pointer"
            >
              {languageSentence[$language].buy}
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Desktop: Grid layout -->
    <div class="w-full max-w-6xl mx-auto p-4">
      <div class="hidden md:grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {#each categories[activeCategory].locations as location, locationIndex}
          {@const locationId = `${activeCategory}-${locationIndex}`}
          
          <div class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            <!-- Card Header -->
            <div class="p-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
              <div class="flex justify-between items-center">
                <div class="min-w-0 flex-1">
                  <h3 class="font-bold text-lg truncate">{location.title}</h3>
                  <p class="text-blue-100 text-sm truncate">{categories[activeCategory].name}</p>
                </div>
              </div>
            </div>
            
            <!-- Card Content -->
            <div class="p-4">
              <!-- Description -->
              <p class="text-gray-700 mb-3 text-sm leading-relaxed">{location.description}</p>
              
              <!-- Rating -->
              {#if location.rating}
                <div class="flex items-center mb-3">
                  <div class="flex">
                    {#each Array(5) as _, i}
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 {i < Math.floor(location.rating) ? 'text-amber-500' : 'text-gray-300'}" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    {/each}
                  </div>
                  <span class="text-gray-600 text-xs ml-2 truncate">{location.rating} ({location.reviewCount} recensioni)</span>
                </div>
              {/if}

              <div class="mt-4 pt-4 border-t border-gray-100 space-y-3">
                {#if location.address}
                  <div class="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span class="text-gray-700 text-sm break-words">{location.address}</span>
                  </div>
                {/if}
                
                {#if location.phone}
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href={`tel:${location.phone}`} class="text-blue-base hover:underline text-sm truncate">{location.phone}</a>
                  </div>
                {/if}
                
                {#if location.website}
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s1.343-9-3-9m-9 9a9 9 0 919-9" />
                    </svg>
                    <a href={location.website} target="_blank" rel="noopener noreferrer" class="text-blue-base hover:underline text-sm truncate">Visit Website</a>
                  </div>
                {/if}
                
                <div class="mt-4">
                  {#if location.cid}
                    <a 
                      href={`https://www.google.com/maps?cid=${location.cid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="w-full py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 rounded-md transition-colors flex items-center justify-center text-sm"
                    >
                      <img src="/google-maps-logo.png" alt="Google Maps" class="h-4 w-4 mr-2">
                      <span class="truncate">{languageSentence[$language].openInGoogleMaps}</span>
                    </a>
                  {/if}
                </div>
              </div>
            </div>
          </div>
        {/each}

        <!-- Desktop Teaser Card -->
        <div class="teaser-card flex flex-col justify-center items-center bg-yellow-50 border border-yellow-300 p-4 rounded-xl shadow-md text-center h-full">
          <div class="max-w-full">
            <h3 class="text-lg font-bold mb-1">
              {languageSentence[$language].more}
            </h3>
            <p class="text-gray-700 text-sm mb-3 break-words">
              {languageSentence[$language].moreSentence}
            </p>
            <button 
              on:click|preventDefault={() => scrollToSection('buyPDFBanner')}
              class="inline-block bg-yellow-600 text-white px-4 py-2 text-sm rounded hover:bg-yellow-700 transition cursor-pointer"
            >
              {languageSentence[$language].buy}
            </button>
          </div>
        </div>
      </div>
    </div>
    {/if}
    
  </div>
</div>
{/if}

<style>
  /* Hide scrollbar for mobile carousel while keeping scroll functionality */
  .scrollbar-hide {
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;  /* Safari and Chrome */
  }
  
  /* Smooth scrolling for the container */
  .scrollbar-hide {
    scroll-behavior: smooth;
  }
  
  /* Custom scroll padding for better snap experience */
  .scrollbar-hide {
    scroll-padding-left: 1rem;
    scroll-padding-right: 1rem;
  }
  
  /* Ensure cards maintain consistent width on mobile */
  @media (max-width: 767px) {
    .scrollbar-hide > * {
      min-width: 18rem; /* 288px - matches w-72 Tailwind class */
    }
  }
</style>