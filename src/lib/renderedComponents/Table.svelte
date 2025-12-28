<script lang="ts">
import { onMount } from 'svelte';
import { language } from '$lib/store/main.svelte.ts';
import PageSectionHead from '$lib/components/PageSectionHead.svelte'
import type { CustomBlockComponentProps } from '$lib/rendererTypes';
  interface Props {
    portableText: CustomBlockComponentProps;
  }

  let { portableText }: Props = $props();
let {value} = $derived(portableText)

let data = [];
let columns = $state([]);
onMount(() => {
  data = JSON.parse(value.data.code);
  columns = data.length > 0 ? Object.keys(data[0]) : [];
});

</script>


<div class="bg-gray-light p-6 md:p-8 text-gray-dark">
  <div class="mx-auto bg-white p-2 md:p-6">
    <PageSectionHead
      title={value.title}
      alignment={"text-left"}
      text={value.description}
    />
    <div class="flex sm:justify-center bg-white rounded-lg px-2 xl:px-10 pt-4 xl:pt-7 pb-5 overflow-y-auto text-md sm:text-xl">
      <table>
        <thead>
          <tr class="divide-x divide-gray-low">
            {#each columns as column (column)}
            <th class="p-4 text-center">{column}</th>
            {/each}
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-low">
          {#each JSON.parse(value.data.code) as row}
            <tr class="divide-x divide-gray-low">
              {#each columns as column}
              <td class="text-center px-2">{row[column] || ''}</td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
