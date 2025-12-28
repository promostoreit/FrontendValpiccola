<script lang="ts">
  import type {MarkComponentProps} from '$lib/rendererTypes'
  interface Props {
    portableText: MarkComponentProps;
    children?: import('svelte').Snippet;
  }

  let { portableText, children }: Props = $props();

  const children_render = $derived(children);
</script>

<a 
  href={portableText.value.slug.current}
  class="link link-success underline font-bold text-blue-high">
  {@render children_render?.()}
</a>
