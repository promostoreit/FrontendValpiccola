<!-- @migration-task Error while migrating Svelte code: Event attribute must be a JavaScript expression, not a string -->
<script lang="ts">
import { onMount } from 'svelte';
import { page } from '$app/stores';
import { language } from '$lib/store/main.svelte.ts';
import { registerEvent } from '$lib/functions/registerEvent.ts'
language.set("en");

let errorId = "";

onMount(() => {
	errorId = crypto.randomUUID()
  registerEvent(
    $page.url.href, 
    "404_page", 
    true, 
    {
      url: $page.url.href,
      language: $language
    }
  );
});

</script>

<section class="my-36 mx-4 space-y-6 h-screen">
  <h1 class="text-2xl md:text-4xl text-center text-gray-dark font-bold">
    Are you lost in Valpiccola?
  </h1>
  <h2 class="text-xl md:text-2xl text-center text-gray-dark">
    It might be time to go home
  </h2>
  <div class="text-sm text-center text-gray-dark">
    Error code: <code>{errorId}</code>
  </div>
  <a href="/" class="">
  <button 
    class="btn w-2/6 flex mx-auto bg-blue-base hover:bg-blue-dark text-blue-light font-bold border-transparent"
  >
    Home
  </button>
  </a>
</section>
