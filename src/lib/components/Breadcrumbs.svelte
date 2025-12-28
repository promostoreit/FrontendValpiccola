<script lang="ts">
import { page } from '$app/stores';
import { convertBreadCrumbsToSchemaOrg } from '$lib/functions/breadcrumbs_to_schemaorg.svelte';

let path = $derived(decodeURIComponent($page.url.pathname).split('/').slice(1));
let breadcrumbsStructuredData = $derived(convertBreadCrumbsToSchemaOrg($page.url.origin, path));
</script>

{@html '<script type="application/ld+json">' + JSON.stringify(breadcrumbsStructuredData) + '</script>'}

<div class="flex mx-auto justify-center w-11/12 sr-only">
  <nav aria-label="Breadcrumb" class="flex my-6">
    <ol class="flex space-x-1 sm:space-x-0 text-xs sm:text-base overflow-hidden text-gray-dark">
      {#each path as x, i (x)}
        <li class="flex items-center w-fit">
          <a href="/{ path.slice(0, i + 1).join("/") }" 
             class="hover:underline">
            {x}
          </a>
          {#if i < path.length - 1}
            /
          {/if}
        </li>
      {/each}
    </ol>
  </nav>
</div>
