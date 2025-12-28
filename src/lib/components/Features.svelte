<script>
import { language } from '$lib/store/main.svelte.ts';

let sentences = {
  "it": {
    "aboveTitle": "Un nuovo tipo di turismo",
    "title": "Le funzionalità che ti aiutano a scoprire il territorio"
  },
  "en": {
    "aboveTitle": "A new type of tourism",
    "title": "Features that help you discover the area"
  },
  "fr": {
    "aboveTitle": "Un nouveau type de tourisme",
    "title": "Des fonctionnalités qui vous aident à découvrir la région"
  },
  "de": {
    "aboveTitle": "Eine neue Art des Tourismus",
    "title": "Funktionen, die Ihnen helfen, die Region zu entdecken"
  }
};

let features = {
  "it": [
    {
      "title": "Categorie intelligenti",
      "description": "La nostra categorizzazione delle attività ti consente di scegliere solo tra le migliori attività.",
      "icon": "/badge-icon.png"

    },
    {
      "title": "Mappa interattiva",
      "description": "Attraverso la mappa interattiva puoi sempre sapere dove andare e cosa fare.",
      "icon": "/map-icon.png"
    },
    {
      "title": "Filtri dinamici",
      "description": "Puoi filtrare le attività in base a categorie e caratteristiche specifiche.",
      "icon": "/filter-icon.png"
    },
    {
      "title": "Salva o escludi attività",
      "description": "Puoi salvare le attività che ti piacciono o escludere quelle che non ti interessano.",
      "icon": "/star-icon.png"
    },
    {
      "title": "Subito su Google Maps",
      "description": "Con un semplice click puoi aprire google maps e iniziare a navigare.",
      "icon": "/google-icon.png"
    }
  ],
  "en": [
    {
      "title": "Smart categories",
      "description": "Our categorization of activities allows you to choose only the best activities.",
      "icon": "/badge-icon.png"
    },
    {
      "title": "Interactive map",
      "description": "Through the interactive map you can always know where to go and what to do.",
      "icon": "/map-icon.png"
    },
    {
      "title": "Dynamic filters",
      "description": "You can filter activities based on specific categories and features.",
      "icon": "/filter-icon.png"
    },
    {
      "title": "Save or exclude activities",
      "description": "You can save the activities you like or exclude those that don't interest you.",
      "icon": "/star-icon.png"
    },
    {
      "title": "Instantly on Google Maps",
      "description": "With a simple click you can open google maps and start navigating.",
      "icon": "/google-icon.png"
    }
  ],
  "fr": [
    {
      "title": "Catégories intelligentes",
      "description": "Notre catégorisation des activités vous permet de choisir uniquement les meilleures activités.",
      "icon": "/badge-icon.png"
    },
    {
      "title": "Carte interactive",
      "description": "Grâce à la carte interactive, vous pouvez toujours savoir où aller et quoi faire.",
      "icon": "/map-icon.png"
    },
    {
      "title": "Filtres dynamiques",
      "description": "Vous pouvez filtrer les activités en fonction de catégories et de caractéristiques spécifiques.",
      "icon": "/filter-icon.png"
    },
    {
      "title": "Enregistrer ou exclure des activités",
      "description": "Vous pouvez enregistrer les activités qui vous plaisent ou exclure celles qui ne vous intéressent pas.",
      "icon": "/star-icon.png"
    },
    {
      "title": "Instantanément sur Google Maps",
      "description": "D'un simple clic, vous pouvez ouvrir Google Maps et commencer à naviguer.",
      "icon": "/google-icon.png"
    }
  ],
  "de": [
    {
      "title": "Intelligente Kategorien",
      "description": "Unsere Kategorisierung der Aktivitäten ermöglicht es Ihnen, nur die besten Aktivitäten auszuwählen.",
      "icon": "/badge-icon.png"
    },
    {
      "title": "Interaktive Karte",
      "description": "Über die interaktive Karte können Sie immer wissen, wohin Sie gehen und was Sie tun können.",
      "icon": "/map-icon.png"
    },
    {
      "title": "Dynamische Filter",
      "description": "Sie können Aktivitäten nach bestimmten Kategorien und Merkmalen filtern.",
      "icon": "/filter-icon.png"
    },
    {
      "title": "Aktivitäten speichern oder ausschließen",
      "description": "Sie können die Aktivitäten speichern, die Ihnen gefallen, oder die ausschließen, die Sie nicht interessieren.",
      "icon": "/star-icon.png"
    },
    {
      "title": "Sofort auf Google Maps",
      "description": "Mit einem einfachen Klick können Sie Google Maps öffnen und mit der Navigation beginnen.",
      "icon": "/google-icon.png"
    }
  ]
};

</script>

<div class="bg-white pt-16 sm:pt-24">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-base/7 font-semibold text-blue-high">
        {sentences[$language].aboveTitle}
      </h2>
      <p class="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl text-balance">
        {sentences[$language].title}
      </p>
    </div>
    <div class="mx-auto mt-8 sm:mt-16 max-w-2xl lg:max-w-5xl">
      <dl class="grid grid-cols-1 gap-x-12 gap-y-10 sm:gap-y-16 lg:grid-cols-3">
        {#each features[$language] as feature}
        <div class="flex flex-col items-center text-center">
          <dt class="flex items-center justify-center gap-x-3 text-base/7 font-semibold text-gray-900">
            <div class="bg-blue-50 rounded-full p-3 flex-shrink-0">
              <img 
                class="w-6 md:w-8 h-6 md:h-8"
                src="{feature.icon}"
                alt="Feature icon"
                title="Feature icon"
              />
            </div>
            <span>{feature.title}</span>
          </dt>
          <dd class="mt-4 flex flex-auto flex-col text-base/7 text-gray-600">
            <p class="flex-auto">
              {feature.description}
            </p>
          </dd>
        </div>
        {/each}
      </dl>
    </div>
  </div>
</div>