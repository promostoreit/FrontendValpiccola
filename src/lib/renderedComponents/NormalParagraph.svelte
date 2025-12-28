<script lang="ts">
  import type {BlockComponentProps} from '@portabletext/svelte'
  interface Props {
    portableText: BlockComponentProps;
    children?: import('svelte').Snippet;
  }

  let { portableText, children }: Props = $props();
  let {value} = $derived(portableText)
  let style = portableText.value.style;

  const children_render = $derived(children);
</script>

<div class="w-4/5 mx-auto md:w-3/5 text-gray-dark">
  {#if style === 'h1'}
    <h1 
      id="{ value.children[0].text.replace(/\s/g, '_') }" 
      class="my-8 text-4xl">
        {@render children_render?.()}
    </h1>
  {:else if style === 'h2'}
    <h2 
      id="{ value.children[0].text.replace(/\s/g, '_') }" 
      class="my-4 mt-8 text-2xl font-bold">
        {@render children_render?.()}
    </h2>
  {:else if style === 'h3'}
    <h3 
      id="{ value.children[0].text.replace(/\s/g, '_') }" 
      class="mt-4 my-2 text-xl font-semibold">
        {@render children_render?.()}
    </h3>
  {:else if style === 'normal'}
    <p class="mb-6 text-md md:text-xl">
      {@render children_render?.()}
    </p>
  {:else if style === 'blockquote'}
    <blockquote class="p-4 italic quote">
      <p class="">
        {@render children_render?.()}
      </p>
    </blockquote>
  {:else}
    <p class="mb-6 text-md md:text-xl">
      {@render children_render?.()}
    </p>
  {/if}
</div>
