<!-- filepath: /Users/roberto/Code/Valpiccola/WebFront/src/lib/components/CartCreditCardForm.svelte -->
<script lang="ts">
import { page } from '$app/stores';
import { onMount, onDestroy, afterUpdate } from 'svelte';
import { fade } from 'svelte/transition';
import { language } from '$lib/store/main.svelte.ts';
import { cart } from '$lib/store/cart';
import { 
  PUBLIC_BACKEND_STRIPE_URL,
  PUBLIC_STRIPE
} from "$env/static/public"
import { sendTelegramMessage } from '$lib/functions/telegram_message_sender'

const stripe = Stripe(PUBLIC_STRIPE);

let checkout;
let showSuccess = false;

// Props per il checkout multiprodotto
export let product_ids: Array<string>;
export let slugs: Array<string>;
export let titles: Array<string>;
export let prices: Array<number>;
  
let totalPrice = 0;
let previousCartSignature = '';
let previousShowSuccess = false;

// Funzione per creare una "firma" del carrello per rilevare i cambiamenti
function getCartSignature() {
  return JSON.stringify({ product_ids, slugs, titles, prices });
}

// Funzione per distruggere il checkout esistente
function destroyCheckout() {
  if (checkout) {
    try {
      checkout.destroy();
      checkout = null;
    } catch (error) {
      console.warn('Errore durante la distruzione del checkout:', error);
    }
  }
}

// Eseguiamo una sola volta onMount
onMount(() => {
  // Calcola il prezzo totale
  totalPrice = prices.reduce((sum, price) => sum + price, 0);
  previousCartSignature = getCartSignature();
  initializeStripe();
});

// Monitora i cambiamenti delle props del carrello
afterUpdate(() => {
  const currentCartSignature = getCartSignature();
  if (previousCartSignature !== currentCartSignature) {
    console.log('Carrello modificato, reinizializzo Stripe checkout...');
    destroyCheckout();
    totalPrice = prices.reduce((sum, price) => sum + price, 0);
    initializeStripe();
    previousCartSignature = currentCartSignature;
  }
  
  // Monitora il cambiamento di showSuccess per svuotare il carrello
  if (showSuccess && !previousShowSuccess) {
    console.log('Pagamento completato con successo, svuoto il carrello...');
    cart.clearCart();
    previousShowSuccess = showSuccess;
  }
});

onDestroy(() => {
  destroyCheckout();
});

async function initializeStripe() {
  const fetchClientSecret = async () => {
    try {
      // Prepara gli elementi per il carrello
      const cartItems = product_ids.map((id, index) => ({
        productType: 'cart',
        productId: id,
        productSlug: slugs[index],
        productTitle: titles[index],
        productPrice: prices[index]
      }));
      const response = await fetch(`${PUBLIC_BACKEND_STRIPE_URL}/create_checkout_session_cart`, {
        method: "POST",
        body: JSON.stringify({
          origin: $page.url.pathname,
          cartItems: cartItems,
          locale: $language
        }),
      });
      const data = await response.json();
      return data.clientSecret;
    } catch (error) {
      console.error(error);
      sendTelegramMessage(`Error in create_checkout_session_cart: ${error}`);
    }
  };
  
  try {
    checkout = await stripe.initEmbeddedCheckout({
      fetchClientSecret,
    });
    checkout.mount('#checkout');
  } catch (error: any) {
    console.error("Failed to initialize Stripe Cart checkout:", error);
    sendTelegramMessage(`Failed to initialize Stripe Cart checkout: ${error?.message || error}`);
  }
}

</script>

<div class="cart-checkout-container bg-white p-4 rounded-lg shadow-lg max-w-4xl mx-auto my-8">
  {#if showSuccess}
    <div class="text-center text-lg mb-10 space-y-4" in:fade|global>
    <p>Payment received successfully!</p>
    <p>Thank you for your purchase!</p>
    <p>You will soon receive a confirmation email.</p>
    </div>
    <div class="flex flex-row space-x-4 justify-center">
    <h3 class="text-xl sm:text-2xl font-bold mb-10 text-center underline">
        See you soon!
    </h3>
    <img 
        src="/logo-small.png" 
        alt="Logo Valpiccola" 
        class="w-12 h-12"
    />
    </div>
  {:else}
    <div id="checkout" class="mt-4">
      <!-- Stripe checkout will be mounted here -->
    </div>
  {/if}
</div>

