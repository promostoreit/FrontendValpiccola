<script lang="ts">
  import type {MarkComponentProps} from '$lib/rendererTypes'
  interface Props {
    portableText: MarkComponentProps;
    children?: import('svelte').Snippet;
  }

  let { portableText, children }: Props = $props();

  const children_render = $derived(children);
</script>

{#if portableText.value.blank}
<a href={portableText.value.href} target="_blank" class="underline">
  {@render children_render?.()}
</a>
{:else}
<a href={portableText.value.href} class="underline">
  {@render children_render?.()}
</a>
{/if}
