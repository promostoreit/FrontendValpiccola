<script lang="ts">
  import { language } from '$lib/store/main.svelte.ts';
  import { buildSanityImage } from '$lib/functions/buildSanityImage';

  interface Props {
    page: {
      slug: string;
      imageProfile: any;
      imageAlt: string;
      imageTitle: string;
      title: string;
    };
  }

  let { page }: Props = $props();

  const languageSentence = {
    "it": { "explore": "Esplora!" },
    "en": { "explore": "Explore!" },
    "de": { "explore": "Erkunden!" },
    "fr": { "explore": "Explorer!" },
    "jp": { "explore": "探検!" },
    "zh": { "explore": "探索!" }
  };
</script>

<div class="w-64 sm:w-72 md:w-80 lg:w-72 xl:w-80 flex-shrink-0 overflow-hidden rounded-3xl shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl">
  <a href={page.slug} class="block relative aspect-[2/3]" aria-label={`Explore ${page.title}`}>
    <img
      src={buildSanityImage(page.imageProfile).width(400).height(600).url()}
      alt={page.imageAlt}
      title={page.imageTitle}
      class="w-full h-full object-cover rounded-3xl"
      loading="lazy"
    />
    <div class="absolute inset-x-0 bottom-0 bg-white/80 p-3 space-y-2">
      <h3 class="font-semibold text-sm sm:text-base md:text-lg text-blue-dark line-clamp-3 sm:line-clamp-2">
        {page.title}
      </h3>
      <div class="bg-blue-dark text-white font-bold py-1 sm:py-2 px-3 sm:px-4 rounded-xl text-center text-xs sm:text-sm transition-colors duration-200 hover:bg-blue-high">
        {languageSentence[$language].explore}
      </div>
    </div>
  </a>
</div>
