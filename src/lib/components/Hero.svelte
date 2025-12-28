<script lang="ts">
import { buildSanityImage } from '$lib/functions/buildSanityImage';
import { language } from '$lib/store/main.svelte.ts';

let { hasProduct, hasDigitalGuide, imageProfile, content, metadata } = $props();

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}

let sentences = {
  "it": {
    "cta": "Ricevi la guida",
  },
  "en": {
    "cta": "Get your guide",
  },
  "fr": {
    "cta": "Obtenez votre guide",
  },
  "de": {
    "cta": "Holen Sie sich Ihren Leitfaden",
  }
};

const trusts = {
 "it": [
    "Subito via email",
    "Aggiornato costantemente",
    "Pratico e divertente",
    "Facile da consultare"
  ],
  "en": [
    "Instantly via email",
    "Constantly updated",
    "Practical and fun",
    "Easy to navigate"
  ],
  "fr": [
    "Instantanément par e-mail",
    "Mise à jour constante",
    "Pratique et amusant",
    "Facile à naviguer"
  ],
  "de": [
    "Sofort per E-Mail",
    "Ständig aktualisiert",
    "Praktisch und unterhaltsam",
    "Einfach zu navigieren"
  ],
  "jp": [
    "すぐにメールで",
    "常に更新",
    "オフラインで使用",
    "簡単にナビゲート"
  ],
  "zh": [
    "立即通过电子邮件",
    "不断更新",
    "实用且有趣",
    "易于导航"
  ]
};

const trustsDigitalGuide = {
  "it": [
    "Non più perdersi tra mille informazioni",
    "Evitare le trappole turistiche",
    "Dimentica l'ansia del 'cosa facciamo ora?'",
    "Risparmia ore di ricerca",
    "Viaggia come un local, non come un turista",
    "Goditi davvero la tua vacanza"
  ],
  "en": [
    "No more getting lost in a sea of information",
    "Avoid tourist traps",
    "Forget the anxiety of 'what do we do now?'",
    "Save hours of research",
    "Travel like a local, not a tourist",
    "Truly enjoy your vacation"
  ],
  "fr": [
    "Ne plus se perdre dans un océan d'informations",
    "Éviter les pièges à touristes",
    "Oubliez l'anxiété du 'que faisons-nous maintenant ?'",
    "Gagnez des heures de recherche",
    "Voyagez comme un local, pas comme un touriste",
    "Profitez vraiment de vos vacances"
  ],
  "de": [
    "Nicht mehr in einem Meer von Informationen verloren gehen",
    "Touristenfallen vermeiden",
    "Vergessen Sie die Angst vor 'was machen wir jetzt?'",
    "Stundenlange Recherche sparen",
    "Reisen Sie wie ein Einheimischer, nicht wie ein Tourist",
    "Genießen Sie Ihren Urlaub wirklich"
  ]
};

</script>

<div class="relative h-screen z-10">
  {#if imageProfile.asset}
    <img
      src={buildSanityImage(imageProfile.asset).height(1000).url()}
      class="absolute inset-0 w-full h-full object-cover opacity-70"
      alt={imageProfile.alt}
      title={imageProfile.title}
    />
  {/if}
  <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/40"></div>
  
  <div class="relative flex flex-col items-center justify-center h-full w-full px-4 sm:px-6 lg:px-8">
    <div class="text-center max-w-4xl">
      <!-- Main Hook with brighter text -->
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white brightness-150 mb-6 leading-tight shadow-text">
        {content.title}
      </h1>

      <!-- Enhanced Subheadline with brighter text -->
      <p class="text-xl sm:text-2xl text-white brightness-150 mb-12 shadow-text max-w-3xl mx-auto">
        {metadata.metaDescription}
      </p>

      {#if hasProduct}
      <div class="flex flex-col items-center gap-6">
        <a
           class="bg-emerald-600 hover:bg-emerald-700 text-white brightness-125 px-8 py-4 rounded-lg text-xl font-bold transition-colors shadow-lg"
           href="#buyPDFBanner"
           on:click|preventDefault={() => scrollToSection('buyPDFBanner')}>
          {sentences[$language].cta}
        </a>
        
        <!-- Trust Elements with brighter text -->
        <div class="flex flex-wrap justify-center gap-x-6 gap-y-2">

          {#if hasDigitalGuide}
            {#each trustsDigitalGuide[$language] as trust}
              <div class="flex items-center gap-2">
                <span class="text-emerald-300">✓</span>
                <span class="text-white brightness-150 shadow-text">
                  {trust}
                </span>
              </div>
            {/each}
          {:else}
            {#each trusts[$language] as trust}
              <div class="flex items-center gap-2">
                <span class="text-emerald-300">✓</span>
                <span class="text-white brightness-150 shadow-text">
                  {trust}
                </span>
              </div>
            {/each}
          {/if}
        </div>
      </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .shadow-text {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
  }
</style>
