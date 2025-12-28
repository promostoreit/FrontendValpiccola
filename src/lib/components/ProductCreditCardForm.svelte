<script lang="ts">
import { page } from '$app/stores';
import { onMount, onDestroy } from 'svelte';
import { fade } from 'svelte/transition';
import { language } from '$lib/store/main.svelte.ts';
import { 
  PUBLIC_BACKEND_STRIPE_URL,
  PUBLIC_STRIPE
} from "$env/static/public"
import { sendTelegramMessage } from '$lib/functions/telegram_message_sender'

const stripe = Stripe(PUBLIC_STRIPE);

let checkout;
let showSuccess = false;

  interface Props {
    product_id: number;
    slug: string;
    title: string;
    price: number;
  }

  let {
    product_id,
    slug,
    title,
    price
  }: Props = $props();

onMount(() => {
  initializeStripe();
});

onDestroy(() => {
  checkout.destroy();
});

async function initializeStripe() {
  const fetchClientSecret = async () => {
    try {
      const response = await fetch(`${PUBLIC_BACKEND_STRIPE_URL}/create_checkout_session_product`, {
        method: "POST",
        body: JSON.stringify({
          productType: 'product',
          origin: $page.url.pathname,
          productId: product_id,
          productSlug: slug,
          productTitle: title,
          productPrice: price,
          locale: $language
        }),
      });
      const data = await response.json();
      return data.clientSecret;
    } catch (error) {
      console.error(error);
      sendTelegramMessage(`Error in create_checkout_session_product: ${error}`);
    }

  };
  try {
    checkout = await stripe.initEmbeddedCheckout({
      fetchClientSecret
    });
    checkout.mount('#checkout');
  } catch (error: any) {
    console.error("Failed to initialize Stripe Product checkout:", error);
    sendTelegramMessage(`Failed to initialize Stripe Product checkout: ${error?.message || error}`);
  }
}

let languageTitles = {
  "it": {
    "seeYouSoon": "Ci vediamo presto!",
    "successMessage": "Pagamento ricevuto con successo!",
    "thankYouMessage": "Grazie per il tuo acquisto!",
    "confirmationMessage": "Riceverai presto un'email di conferma."
  },
  "en": {
    "seeYouSoon": "See you soon!",
    "successMessage": "Payment received successfully!",
    "thankYouMessage": "Thank you for your purchase!",
    "confirmationMessage": "You will soon receive a confirmation email."
  },
  "de": {
    "seeYouSoon": "Bis bald!",
    "confirmationMessage": "Sie werden bald eine Bestätigungs-E-Mail erhalten.",
    "thankYouMessage": "Vielen Dank für Ihren Einkauf!",
    "successMessage": "Zahlung erfolgreich erhalten!"
  },
  "fr": {
    "seeYouSoon": "À bientôt!",
    "confirmationMessage": "Vous recevrez bientôt un e-mail de confirmation.",
    "thankYouMessage": "Merci pour votre achat!",
    "successMessage": "Paiement reçu avec succès!"
  },
  "jp": {
    "seeYouSoon": "またね!",
    "confirmationMessage": "確認メールがすぐに届きます。",
    "thankYouMessage": "ご購入ありがとうございます！",
    "successMessage": "支払いが成功しました！"
  },
  "zh": {
    "seeYouSoon": "再见!",
    "confirmationMessage": "您将很快收到确认电子邮件。",
    "thankYouMessage": "感谢您的购买！",
    "successMessage": "付款成功！"
  }
}

</script>

{#if showSuccess}
<div class="text-center text-lg mb-10 space-y-4" in:fade|global>
  <p>{languageTitles[$language].successMessage}</p>
  <p>{languageTitles[$language].thankYouMessage}</p>
  <p>{languageTitles[$language].confirmationMessage}</p>
</div>
<div class="flex flex-row space-x-4 justify-center">
  <h3 class="text-xl sm:text-2xl font-bold mb-10 text-center underline">
    {languageTitles[$language].seeYouSoon}
  </h3>
  <img 
    src="/logo-small.png" 
    alt="Logo Valpiccola" 
    class="w-12 h-12"
  />
</div>
{:else}
<div id="checkout">
  <!-- Stripe checkout will be mounted here -->
</div>
{/if}
