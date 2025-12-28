<script lang="ts">
  import { cart, getCartTotal, getCartSize } from '$lib/store/cart';
  import { 
    language,
    translations,
    navbar
 } from '$lib/store/main.svelte.ts';

  import { page } from '$app/stores';
  import { registerEvent } from '$lib/functions/registerEvent';
  import Header from '$lib/components/Header.svelte'
  import Footer from '$lib/components/Footer.svelte';
  import CartCreditCardForm from '$lib/components/CartCreditCardForm.svelte';

  const hasDigitalGuide = false;
  
  // Stato per il checkout
  let showCheckout = false;

  // Traduzioni
  const sentences = {
    title: "Your cart",
    product: "Product",
    price: "Price",
    total: "Total",
    emptyCart: "Your cart is empty",
    emptyCartDesc: "Add products to your cart to see them here.",
    continueShopping: "Continue shopping",
    checkout: "Proceed to checkout" 
  };



  function handleItemRemove(itemId, itemTitle) {
    cart.removeItem(itemId);
    
    // Nascondi il checkout se era visibile
    if (showCheckout) {
      showCheckout = false;
    }
    
    // Registrazione evento per analytics
    registerEvent(
      $page.url.href,
      "cart_item_removed",
      false,
      {
        item_id: itemId,
        item_title: itemTitle
      }
    );
  }


  function handleCheckoutClick() {
    // Mostra il form di checkout
    showCheckout = true;
    
    // Registra l'evento di inizio checkout
    registerEvent(
      $page.url.href,
      "checkout_initiated",
      true,
      {
        items_count: getCartSize($cart),
        cart_total: getCartTotal($cart)
      }
    );
  }
</script>

<Header 
  navbar={{}}
  translations={[]}
  {hasDigitalGuide}
/>

<div class="container mx-auto px-4 py-8 max-w-4xl">
  <h1 class="text-3xl font-bold mb-6">{sentences.title}</h1>
  
  {#if $cart.length > 0}
    <div class="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <!-- Desktop Table View -->
      <div class="hidden md:block">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="text-left py-4">{sentences.product}</th>
                <th class="text-right py-4">{sentences.price}</th>
                <th class="py-4 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {#each $cart as item}
                <tr class="border-b border-gray-200">
                  <td class="py-4">
                    <div class="flex items-center">
                      {#if item.imageUrl}
                        <img src={item.imageUrl} alt={item.title} class="w-16 h-16 object-cover rounded mr-4" />
                      {:else}
                        <div class="w-16 h-16 bg-gray-100 rounded mr-4 flex items-center justify-center text-gray-400">No image</div>
                      {/if}
                      <div>
                        <a href={item.slug.current} class="font-medium text-blue-600 hover:text-blue-800">
                          {item.title}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td class="py-4 text-right font-medium">
                    {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(item.price)}
                  </td>
                  <td class="py-4 text-right">
                    <button 
                      class="text-red-500 hover:text-red-700"
                      on:click={() => handleItemRemove(item._id, item.title)}
                      aria-label="Remove item"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Mobile Card View -->
      <div class="md:hidden space-y-4">
        {#each $cart as item}
          <div class="bg-gray-50 rounded-lg p-4 relative">
            <div class="flex gap-3">
              {#if item.imageUrl}
                <img src={item.imageUrl} alt={item.title} class="w-20 h-20 object-cover rounded flex-shrink-0" />
              {:else}
                <div class="w-20 h-20 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs flex-shrink-0">
                  No image
                </div>
              {/if}
              
              <div class="flex-1 min-w-0">
                <a href={item.slug.current} class="font-medium text-blue-600 hover:text-blue-800 text-sm leading-tight block mb-2">
                  {item.title}
                </a>
                <div class="text-lg font-semibold text-gray-900">
                  {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(item.price)}
                </div>
              </div>
              
              <button 
                class="text-red-500 hover:text-red-700 p-1 absolute top-2 right-2"
                on:click={() => handleItemRemove(item._id, item.title)}
                aria-label="Remove item"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        {/each}
      </div>
      
      <!-- Total Section -->
      <div class="border-t border-gray-200 mt-6 pt-4">
        <div class="flex justify-between items-center mb-6">
          <span class="text-lg font-bold">{sentences.total}:</span>
          <span class="text-xl font-bold text-blue-600">
            {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(getCartTotal($cart))}
          </span>
        </div>
        
        <div class="flex flex-col sm:flex-row justify-between gap-4">
          
          {#if !showCheckout}
            <button
              class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded order-1 sm:order-2"
              on:click={handleCheckoutClick}
            >
              {sentences.checkout}
            </button>
          {/if}
        </div>
      </div>
      
      {#if showCheckout}
        <div class="mt-8">
          <CartCreditCardForm
            product_ids={$cart.map(item => item._id)}
            slugs={$cart.map(item => item.slug.current)}
            titles={$cart.map(item => item.title)}
            prices={$cart.map(item => item.price)}
          />
        </div>
      {/if}
    </div>
  {:else}
    <div class="bg-white rounded-lg shadow-md p-8 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <h2 class="text-2xl font-semibold mb-4">{sentences.emptyCart}</h2>
      <p class="text-gray-600 mb-6">{sentences.emptyCartDesc}</p>
      <a href="/" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded">
        {sentences.continueShopping}
      </a>
    </div>
  {/if}
</div>

<Footer 
  footer={{}}
/>