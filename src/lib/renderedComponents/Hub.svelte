<script lang="ts">
  import HubCard from '$lib/components/HubCard.svelte';
  
  interface Props {
    portableText: {
      value: {
        title: string;
        pages: Array<any>;
      }
    };
  }

  let { portableText }: Props = $props();

  let { value } = $derived(portableText);
</script>

<section class="mt-2 sm:mt-4 mb-4 mx-auto pb-2 sm:pb-4 text-gray-dark">
  <div class="container mx-auto px-4">
    <h2 class="text-xl md:text-2xl font-bold mt-2 md:mt-4">
      {value.title}
    </h2>
  </div>
  
  <!-- Mobile: Horizontal scrolling -->
  <div class="mt-4 sm:mt-6 lg:hidden mx-4 flex gap-4 overflow-x-auto pb-4 snap-x">
    {#each value.pages as page (page.slug)}
      <div class="snap-start">
        <HubCard {page} />
      </div>
    {/each}
  </div>
  
  <!-- Desktop: Grid layout -->
  <div class="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6 px-4 container mx-auto">
    {#each value.pages as page (page.slug)}
      <div class="flex justify-center">
        <HubCard {page} />
      </div>
    {/each}
  </div>
</section>
