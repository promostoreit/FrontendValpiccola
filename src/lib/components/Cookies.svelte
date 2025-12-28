<script>
import { onMount } from 'svelte';
import { page } from '$app/stores';
import { language } from '$lib/store/main.svelte.ts';
import { v4 as uuidv4 } from "uuid";
import { registerEvent } from '$lib/functions/registerEvent.ts';

let cookieConsent = false;
let cookieBannerActive = true;

// Funzione per generare e impostare un userId
function setUserId() {
  const uuid = uuidv4();
  const cookieExpiry = "Path=/; Expires=Thu, 31 Dec 2099 00:00:01 GMT";
  document.cookie = `userId=${uuid}; ${cookieExpiry};`;
  return uuid;
}

onMount(() => {
  const cookieConsentMatch = document.cookie.match('(^|;)\\s*cookieConsent\\s*=\\s*([^;]+)');
  cookieConsent = cookieConsentMatch ? cookieConsentMatch.pop() === 'true' : false;
  cookieBannerActive = !cookieConsent;
  
  // Controlla se esiste già un userId, altrimenti ne crea uno di default
  const userIdMatch = document.cookie.match('(^|;)\\s*userId\\s*=\\s*([^;]+)');
  if (!userIdMatch) {
    // Crea un userId di default
    setUserId();
  }
});

function storeCookieSetting(cookieSelection) {
  cookieBannerActive = false;
  if (cookieSelection) {
    // L'utente ha accettato i cookie, impostiamo solo il flag di consenso
    let cookieExpiry = "Path=/; Expires=Thu, 31 Dec 2099 00:00:01 GMT";
    document.cookie = `cookieConsent=true; ${cookieExpiry};`;
    
    // Verifica che esista già un userId, altrimenti lo crea
    const userIdMatch = document.cookie.match('(^|;)\\s*userId\\s*=\\s*([^;]+)');
    if (!userIdMatch) {
      setUserId();
    }
  } else {
    // L'utente ha rifiutato i cookie, eliminiamo userId
    let cookieExpiry = "Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT";
    document.cookie = `userId=; ${cookieExpiry};`;
  }
  registerEvent(
    $page.url.href,
    "cookie_selection",
    true,
    {cookieSelection: cookieSelection}
  );
}

let cookieMessages = {
  "en": {
    "firstSentence": "We use cookies to provide you with the best user experience possible.",
    "accept": "Accept",
    "reject": "Reject"
  },
  "de": {
    "firstSentence": "Wir verwenden Cookies, um Ihnen die bestmögliche Nutzererfahrung zu bieten.",
    "accept": "Akzeptieren",
    "reject": "Ablehnen"
  },
  "it": {
    "firstSentence": "Usiamo i cookie per fornirti la miglior esperienza d'uso possibile.",
    "accept": "Accetta",
    "reject": "Rifiuta"
  },
  "fr": {
    "firstSentence": "Nous utilisons des cookies pour vous offrir la meilleure expérience utilisateur possible.",
    "accept": "Accepter",
    "reject": "Rejeter"
  },
  "jp": {
    "firstSentence": "最高のユーザーエクスペリエンスを提供するためにクッキーを使用しています。",
    "accept": "受け入れる",
    "reject": "拒否する"
  },
  "zh": {
    "firstSentence": "我们使用 cookie 为您提供尽可能最好的用户体验。",
    "accept": "接受",
    "reject": "拒绝"
  }
};
</script>

{#if cookieBannerActive}
  <div class="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 transition-all duration-300 ease-in-out z-50">
    <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex-1">
          <p class="text-sm text-gray-700">
            {cookieMessages[$language].firstSentence}
          </p>
        </div>
        <div class="flex items-center gap-3">
          <button
            on:click={() => storeCookieSetting(false)}
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-md transition-colors"
          >
            {cookieMessages[$language].reject}
          </button>
          <button
            on:click={() => storeCookieSetting(true)}
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md transition-colors"
          >
            {cookieMessages[$language].accept}
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
