<script lang="ts">
  import { onMount } from 'svelte';
  import { language } from '$lib/store/main.svelte.ts';
  import { buildSanityImage } from '$lib/functions/buildSanityImage';

  export let portableText: any;
  let { value } = portableText;

  let product_id = '';
  let slug = '';
  let parent = '';
  let title = '';
  let imageProfile = '';
  let imageAlt = '';
  let imageTitle = '';

  onMount(() => {
    product_id = value.reference._ref;
    slug = value.slug.current;
    parent = value.parent;
    title = value.title;
    imageProfile = value.imageProfile.asset;
    imageAlt = value.imageProfile.alt;
    imageTitle = value.imageProfile.title;
    console.log(imageProfile);
    console.log(imageAlt);
    console.log(imageTitle);
  });
  
  const languageSentence = {
    "it": {
      "discoverMore": "Scopri di più",
      "exploreGuide": "Esplora la Guida",
    },
    "en": {
      "discoverMore": "Discover more",
      "exploreGuide": "Explore the Guide",
    }
  };
</script>

{#if imageProfile}

<!-- 🔷 BANNER CLICCABILE -->
<a href={parent} class="block group">
  <div class="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white rounded-2xl shadow-xl my-2 transition-transform duration-300 group-hover:scale-[1.02]">

    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 opacity-20">
      <img
        src={buildSanityImage(imageProfile).width(800).height(400).url() || "/placeholder.svg"}
        alt=""
        class="w-full h-full object-cover"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-blue-800/90 via-blue-700/70 to-blue-600/50"></div>
    </div>

    <!-- Content -->
    <div class="relative max-w-6xl mx-auto px-6 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        
        <!-- Text Section -->
        <div class="lg:col-span-2 space-y-6 relative z-10">
          <div>
            <div class="inline-flex items-center bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full text-sm font-medium mb-4">
              {languageSentence[$language].discoverMore}
            </div>
            <h2 class="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              {title}
            </h2>
            <div class="flex flex-col sm:flex-row gap-4 items-start">
              <button class="inline-flex items-center bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <span>
                  {languageSentence[$language].exploreGuide}
                </span>
                <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Featured Image -->
        <div class="lg:col-span-1 flex justify-center lg:justify-end relative z-10">
          <div class="relative">
            <div class="w-64 h-48 lg:w-72 lg:h-54 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 transition-transform duration-300 group-hover:scale-105">
              <img
                src={buildSanityImage(imageProfile).width(400).height(300).url() || "/placeholder.svg"}
                alt={imageAlt}
                title={imageTitle}
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div class="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full opacity-80 animate-pulse"></div>
            <div class="absolute -bottom-3 -left-3 w-4 h-4 bg-white/30 rounded-full"></div>
          </div>
        </div>

      </div>
    </div>

  </div>
</a>

<!-- 🔷 SEO CAPTION TEXT: sotto al banner -->
<p class="text-sm text-center text-gray-600">
  <a href="/bologna/guida" class="text-blue-700 underline font-semibold hover:text-blue-900">
    {title}
  </a>
</p>

{/if}
