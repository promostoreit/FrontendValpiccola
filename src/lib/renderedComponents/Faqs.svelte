<script lang="ts">
import type {CustomBlockComponentProps} from '$lib/rendererTypes'
import { convertFaqToSchemaOrg } from '$lib/functions/faq_to_schemaorg.svelte';
  interface Props {
    portableText: CustomBlockComponentProps;
  }

  let { portableText }: Props = $props();
let {value} = $derived(portableText)
let faqStructuredData = $derived(convertFaqToSchemaOrg(value.data));
</script>

{@html '<script type="application/ld+json">' + JSON.stringify(faqStructuredData) + '</script>'}

<div class="mt-16 sm:mt-16 mb-4 mx-auto pb-8 sm:pb-12 text-gray-dark px-8">
  <h2 class="text-xl md:text-2xl font-bold mx-auto mt-4 md:mt-8">
    {value.title}
  </h2>
  <div class="flex flex-col">
    {#each Object.entries(value.data) as [key, value]}
    <div class="my-2 md:my-4 text-lg md:text-2xl">
      <div for={key} class="font-bold text-blue-high py-2 md:py-4">
        {value.question}
      </div>
      <div class="my-1 md:my-2">
        { value.answer }
      </div>
    </div>
    {/each}
  </div>
</div>
