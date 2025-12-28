<script lang="ts">
import Socials from '$lib/components/Socials.svelte'
let { footer } = $props();
const { 
  pagesLink,
  legal,
  rights,
  reference,
  email,
  companyId
} = footer;

</script>

<footer class="page-footer font-small unique-color-dark pt-12 sm:pt-24 bg-[#01668d]">
  <div>
    <div class="mx-auto w-full max-w-screen-xl px-12 pb-4">
      <div class="md:flex md:justify-between">
        <div class="mb-6 md:mb-0">
          <a href="/" class="flex items-center">
            <img 
              src="/logo-small.png" 
              class="h-8 mr-3" 
              alt="Valpiccola Logo" 
              title="Valpiccola Logo" 
            />
            <span class="self-center text-2xl font-semibold whitespace-nowrap text-gray-light">
              Valpiccola
            </span>
          </a>
        </div>
        {#if Object.keys(footer).length > 0}
        <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 max-w-xl">
          <div>
            <h2 class="mb-6 text-sm font-bold text-gray-light uppercase">
              {pagesLink.categoryTitle}
            </h2>
            <ul class="text-gray-light font-medium">
              {#each Object.entries(pagesLink.listPages.pages) as [key, value]}
              <li class="mb-4" id={key}>
                <a href="{value.slug.current}" class="hover:underline">
                  {value.keyword}
                </a>
              </li>
              {/each}
            </ul>
          </div>
          <div>
            <h2 class="mb-6 text-sm font-bold text-gray-light uppercase">
              {legal.categoryTitle}
            </h2>
            <ul class="text-gray-light font-medium">
              {#each Object.entries(legal.listPages.pages) as [key, value]}
              <li class="mb-4" id={key}>
                <a href="{value.slug.current}" class="hover:underline">{value.keyword}</a>
              </li>
              {/each}
            </ul>
          </div>
        </div>
        {/if}
      </div>
      <hr class="my-6 border-gray-light sm:mx-auto lg:my-8" />
      {#if Object.keys(footer).length > 0}
      <div class="sm:flex sm:items-center sm:justify-between">
        <div class="text-sm text-gray-light">
          {rights}<br>
          {companyId}<br>
          {email}<br>
        </div>
        <div class="font font-col text-sm text-gray-light my-1">
          <a href="https://www.streamlinehq.com/" target="_blank" rel="noreferrer">
            {reference}
          </a><br>
          <div class="flex items-center">
            <a href="https://www.stormkit.io/" target="_blank" class="flex items-center space-x-2 underline">
              <span>Proudly powered by Stormkit</span>
              <img 
                class="h-4"
                src="/stormkit-logo.svg"
                alt="Stormkit Logo"
              >
            </a>
          </div>
        </div>
        <div class="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
          <Socials widthMobile=4 widthDesktop=6 padding=2/>
        </div>
      </div>
      {/if}
    </div>
  </div>
</footer>

