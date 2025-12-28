  <script lang="ts">
    import type {BlockComponentProps} from '@portabletext/svelte'
    import PageSectionHead from '$lib/components/PageSectionHead.svelte'
    
    interface Props {
      portableText: BlockComponentProps;
    }

    let { portableText }: Props = $props();
    let {value} = $derived(portableText)
  </script>


  <div class="my-6 sm:my-10 mx-auto py-2 sm:py-4 max-w-6xl px-4 sm:px-6 lg:px-8">
    <h2 class="text-2xl md:text-3xl font-bold text-blue-dark mb-4 sm:mb-6 border-b border-gray-low pb-2">
      {value.title}
    </h2>
    
    <!-- Improved text container with better readability on desktop -->
    <div class="text-gray-high text-lg md:text-2xl leading-relaxed mx-auto prose prose-lg" id="intro">
      {@html value.text}
    </div>

  </div>