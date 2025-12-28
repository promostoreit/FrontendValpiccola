<script lang="ts">
import { onMount } from 'svelte';
import { page } from '$app/stores';
import { language } from '$lib/store/main.svelte.ts';
import { registerEvent } from '$lib/functions/registerEvent'

language.set("en");

onMount(() => {
  registerEvent(
    $page.url.href, 
    "payment_confirmation",
    true, 
    {
      url: $page.url.href,
      language: $language
    }
  );
});

</script>

<section class="flex flex-col items-center justify-center h-screen">
  <div class="text-center space-y-6">
    <h1 class="text-2xl md:text-4xl text-gray-dark font-bold">
      Payment Confirmation
    </h1>
    <h2 class="text-xl md:text-2xl text-green-600">
      Your payment was successful!
    </h2>
    <button 
      class="btn w-full md:w-2/3 lg:w-1/2 bg-green-500 hover:bg-green-600 text-white font-bold border-transparent py-2 px-4 rounded"
      onclick={() => window.location.href='/'}
    >
      Return to Home
    </button>
  </div>
</section>
