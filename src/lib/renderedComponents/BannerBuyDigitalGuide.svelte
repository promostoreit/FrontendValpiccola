<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { language } from '$lib/store/main.svelte.ts';
  import { registerEvent } from '$lib/functions/registerEvent';
  import { convertDigitalProductToSchemaOrg } from '$lib/functions/product_to_schemaorg.svelte';
  import ProductCreditCardFormEasy from '$lib/components/ProductCreditCardForm.svelte';

  export let portableText: any;
  let { value } = portableText;

  let product_id = '';
  let slug = '';
  let title = '';
  let description = '';
  let price = 0;
  let categoryStats = [];

  let showCheckout = false;

  let productStructuredData = {};

  onMount(() => {
    product_id = value.reference._ref;
    slug = value.slug.current;
    title = value.title;
    description = value.description;
    price = value.price;
    categoryStats = value.categoryStats;

    productStructuredData = convertDigitalProductToSchemaOrg(
      slug, 
      title,
      description,
      '/valpiccola-guide-login.webp',
      price
    );
  });

  function handleButtonClick() {
    showCheckout = true;
    registerEvent(
      $page.url.href,
      "click_buy_guide_from_banner",
      true,
      {
        guide_title: title,
        guide_price: price,
        guide_slug: slug
      }
    );
  }
  
  let currentIndex = 0;

  function nextSlide() {
    currentIndex = (currentIndex + 1) % imagesProduct.length;
    registerEvent(
      $page.url.href,
      "click_next_image_buyPDFBanner",
      false,
      {}
    );
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + imagesProduct.length) % imagesProduct.length;
    registerEvent(
      $page.url.href,
      "click_prev_image_buyPDFBanner",
      false,
      {}
    );
  }

  const legalUrlsMap = {
    'it': '/it/note-legali',
    'en': '/en/legal-notes',
    'de': '/de/rechtliche-hinweise',
    'fr': '/fr/notes-legales',
    'jp': '/en/legal-notes',
    'zh': '/en/legal-notes'
  };

  const languageSentence = {
    "it": {
      "buyPDF": "Acquista la Guida Ora",
      "acceptTerms": "Acquistando accetto i termini e le condizioni",
      "instantDelivery": "Subito nella tua email!",
      "guideInEnglish": "La lingua della guida è l'inglese",
      "only": "Solo",
      "stats": "Attività incluse nella guida"
    },
    "en": {
      "buyPDF": "Buy the Guide Now",
      "acceptTerms": "By purchasing I accept the terms and conditions",
      "instantDelivery": "Instantly in your email!",
      "guideInEnglish": "The guide is in English",
      "only": "Only",
      "stats": "Activities included in the guide"
    },
    "de": {
      "buyPDF": "Kaufen Sie den Leitfaden jetzt",
      "acceptTerms": "Mit dem Kauf akzeptiere ich die Geschäftsbedingungen",
      "instantDelivery": "Sofort in Ihrer E-Mail!",
      "guideInEnglish": "Der Leitfaden ist in Englisch",
      "only": "Nur",
      "stats": "Aktivitäten im Leitfaden"
    },
    "fr": {
      "buyPDF": "Achetez le guide maintenant",
      "acceptTerms": "En achetant, j'accepte les termes et conditions",
      "instantDelivery": "Immédiatement dans votre e-mail!",
      "guideInEnglish": "Le guide est en anglais",
      "only": "Seulement",
      "stats": "Activités incluses dans le guide"
    },
    "jp": {
      "buyPDF": "ガイドを今すぐ購入",
      "acceptTerms": "購入することで、利用規約に同意します",
      "instantDelivery": "すぐにあなたのメールで！",
      "guideInEnglish": "ガイドは英語です",
      "only": "のみ",
      "stats": "ガイドに含まれるアクティビティ"
    },
    "zh": {
      "buyPDF": "立即购买指南",
      "acceptTerms": "购买即表示我接受条款和条件",
      "instantDelivery": "立即发送到您的电子邮件！",
      "guideInEnglish": "指南是英文的",
      "only": "仅",
      "stats": "指南中包含的活动"
    }
  };

  const imagesProduct = [
    "valpiccola-guide-login.webp",
    "valpiccola-guide-homepage.webp",
    "valpiccola-guide-filters.webp",
    "valpiccola-guide-map.webp",
    "valpiccola-guide-details.webp"
  ]

let categorySentences = {
  "adventures": {
    "it": "Avventura",
    "en": "Adventures",
    "fr": "Aventures",
    "de": "Abenteuer"
  },
  "beaches": {
    "it": "Spiagge",
    "en": "Beaches",
    "fr": "Plages",
    "de": "Strände"
  },
  "bikeRentals": {
    "it": "Noleggio bici",
    "en": "Bike rentals",
    "fr": "Location de vélos",
    "de": "Fahrradverleih"
  },
  "boatRentals": {
    "it": "Noleggio barche",
    "en": "Boat rentals",
    "fr": "Location de bateaux",
    "de": "Bootsverleih"
  },
  "campings": {
    "it": "Campeggi",
    "en": "Campings",
    "fr": "Campings",
    "de": "Campingplätze"
  },
  "classes": {
    "it": "Corsi",
    "en": "Classes",
    "fr": "Cours",
    "de": "Kurse"
  },
  "farms": {
    "it": "Fattorie",
    "en": "Farms",
    "fr": "Fermes",
    "de": "Bauernhöfe"
  },
  "historicalSites": {
    "it": "Siti storici",
    "en": "Historical sites",
    "fr": "Sites historiques",
    "de": "Historische Stätten"
  },
  "iceCream": {
    "it": "Gelaterie",
    "en": "Ice cream",
    "fr": "Glaces",
    "de": "Eisdielen"
  },
  "kidsActivities": {
    "it": "Attività per bambini",
    "en": "Kids activities",
    "fr": "Activités pour enfants",
    "de": "Kinderaktivitäten"
  },
  "markets": {
    "it": "Mercati",
    "en": "Markets",
    "fr": "Marchés",
    "de": "Märkte"
  },
  "museums": {
    "it": "Musei",
    "en": "Museums",
    "fr": "Musées",
    "de": "Museen"
  },
  "nightclubs": {
    "it": "Discoteche",
    "en": "Nightclubs",
    "fr": "Boîtes de nuit",
    "de": "Nachtclubs"
  },
  "parkings": {
    "it": "Parcheggi",
    "en": "Parkings",
    "fr": "Parkings",
    "de": "Parkplätze"
  },
  "parks": {
    "it": "Parchi",
    "en": "Parks",
    "fr": "Parcs",
    "de": "Parks"
  },
  "pharmacies": {
    "it": "Farmacie",
    "en": "Pharmacies",
    "fr": "Pharmacies",
    "de": "Apotheken"
  },
  "playgrounds": {
    "it": "Aree gioco",
    "en": "Playgrounds",
    "fr": "Aires de jeux",
    "de": "Spielplätze"
  },
  "shopping": {
    "it": "Shopping",
    "en": "Shopping",
    "fr": "Shopping",
    "de": "Einkaufen"
  },
  "streetFood": {
    "it": "Street food",
    "en": "Street food",
    "fr": "Street food",
    "de": "Straßenessen"
  },
  "thermalSpas": {
    "it": "Terme",
    "en": "Thermal spas",
    "fr": "Spas thermaux",
    "de": "Thermalbäder"
  },
  "traditionalRestaurants": {
    "it": "Ristoranti tradizionali",
    "en": "Traditional restaurants",
    "fr": "Restaurants traditionnels",
    "de": "Traditionelle Restaurants"
  },
  "trekking": {
    "it": "Trekking",
    "en": "Trekking",
    "fr": "Randonnée",
    "de": "Wandern"
  },
  "viewPoints": {
    "it": "Punti panoramici",
    "en": "View points",
    "fr": "Points de vue",
    "de": "Aussichtspunkte"
  },
  "waterSport": {
    "it": "Sport acquatici",
    "en": "Water sports",
    "fr": "Sports nautiques",
    "de": "Wassersport"
  },
  "wineries": {
    "it": "Cantine",
    "en": "Wineries",
    "fr": "Vignobles",
    "de": "Weingüter"
  }
};

</script>

{@html '<script type="application/ld+json">' + JSON.stringify(productStructuredData) + '</script>'}

<div class="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 text-white my-8 shadow-2xl transform
  hover:scale-[1.02] transition-all duration-300 py-8 sm:py-0" id="buyPDFBanner">
  <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-2 lg:py-12 mt-2">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div class="order-2 lg:order-1">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 text-white leading-tight">
          {title}
        </h2>
        <p class="text-lg sm:text-xl text-blue-100 mb-6 leading-relaxed">
          {description}
        </p>
        <div class="bg-blue-700/50 rounded-xl p-2 mb-6">
          <h3 class="flex items-center text-xl font-semibold mb-4 text-yellow-300">
            ⭐ {languageSentence[$language].stats}
          </h3>
          <ul class="grid grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-4">
            {#each Object.entries(categoryStats) as [category, count]}
              {#if count > 0}
                <li class="text-blue-50 text-sm">
                  {count} {categorySentences[category][$language]}
                </li>
              {/if}
            {/each}
          </ul>
        </div>
        
        <div class="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 bg-blue-800/50 rounded-xl p-6">
          <div class="flex flex-col items-center sm:items-start sm:space-x-4">
            <div class="text-center sm:text-left mb-2 sm:mb-0">
              <span class="text-yellow-300 font-bold text-lg">
                {languageSentence[$language].only}
              </span>
              <span class="text-4xl sm:text-5xl font-bold text-yellow-300">
                €{price.toFixed(2)}
              </span>
            </div>
            <div class="flex items-center text-blue-200">
              {languageSentence[$language].instantDelivery}
            </div>
          </div>
          <button
            on:click={handleButtonClick}
            class="w-full sm:w-auto font-bold bg-yellow-400 text-blue-900 py-3 sm:py-4 px-6 sm:px-8 rounded-full text-lg sm:text-xl hover:bg-yellow-300 transition-colors duration-300 transform hover:scale-105 shadow-lg"
          >
            {languageSentence[$language].buyPDF}
          </button>
        </div>
        <p class="text-center text-blue-200 text-xs sm:text-sm mt-4">
          <a href={legalUrlsMap[$language]} class="underline text-yellow-300 transition-colors duration-200">
            {languageSentence[$language].acceptTerms}
          </a>
          <br>{languageSentence[$language].guideInEnglish}
        </p>
      </div>

      <div class="order-1 lg:order-2 relative h-[300px] sm:h-[400px] lg:h-[500px]"> <div class="absolute inset-0 bg-white opacity-20 blur-xl rounded-lg"></div>
        {#each imagesProduct as image, index}
          <img
            src="/{image}"
            class="absolute inset-0 w-full h-full object-contain z-10 transition-all duration-500 hover:rotate-2 rounded-lg"
            style="opacity: {index === currentIndex ? 1 : 0}; transform: {index === currentIndex ? 'scale(1)' : 'scale(0.9)'}"
          />
        {/each}
        <button
          on:click={prevSlide}
          class="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-20"
          aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        <button
          on:click={nextSlide}
          class="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-20"
          aria-label="Next image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>

  {#if showCheckout}
  <ProductCreditCardFormEasy
    product_id={product_id}
    slug={slug}
    title={title}
    price={typeof price === 'string' ? parseFloat(price) : price}
  />
  {/if}
</div>
