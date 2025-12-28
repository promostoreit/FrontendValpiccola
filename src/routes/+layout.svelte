<script lang="ts">
import "../app.css";
import { navigating, page } from '$app/stores'
import Cookies from '$lib/components/Cookies.svelte'
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

{#if $navigating}
<div class="flex items-center justify-center h-screen">
  <img 
    class="h-8 z-40 mx-auto my-auto animate-spin"
    src="/logo.png"
    alt="Valpiccola Logo"
  >
</div>
{:else}
{@render children?.()}
  <Cookies/>
{/if}
