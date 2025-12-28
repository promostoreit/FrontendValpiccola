<script lang="ts">
import type {CustomBlockComponentProps} from '$lib/rendererTypes'
import PageSectionHead from '$lib/components/PageSectionHead.svelte'

import { convertOpeningHoursToSchemaOrg } from '$lib/functions/openingHours_to_schemaorg.svelte';
  interface Props {
    portableText: CustomBlockComponentProps;
  }

  let { portableText }: Props = $props();
let {value} = $derived(portableText)
let openingHoursStructuredData = $derived(convertOpeningHoursToSchemaOrg(value["schemaOrg"]));
</script>

{@html '<script type="application/ld+json">' + JSON.stringify(openingHoursStructuredData) + '</script>'}

<div class="mx-auto bg-white p-2 md:p-8 text-gray-dark">
  <PageSectionHead
    title={value.title}
    alignment={"text-center"}
    text={value.intro}
  />
  <div class="w-5/6 md:w-3/5 mx-auto flex justify-center my-2 md:my-6 text-lg md:text-2xl">
    <table>
      {#each Object.entries(value.data) as [key, i]}
        <tr>
          <td class="font-bold uppercase p-1 md:p-3 align-top">
            {i.detail}:
          </td>
          <td class="p-1 md:p-3 align-top">
            {i.time}
          </td>
        </tr>
      {/each}
    </table>
  </div>
</div>
