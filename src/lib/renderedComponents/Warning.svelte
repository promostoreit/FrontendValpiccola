<script lang="ts">
import type {CustomBlockComponentProps} from '$lib/rendererTypes'
  interface Props {
    portableText: CustomBlockComponentProps;
  }

  let { portableText }: Props = $props();
let {value} = $derived(portableText)
</script>

<div class="my-8 relative">
  <!-- Left accent border -->
  <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-base rounded-l-md"></div>
  
  <div class="pl-6 pr-6 py-6 md:py-8 bg-white shadow-lg border-r border-t border-b border-gray-light rounded-r-md">
    <!-- Header with minimal icon -->
    <div class="flex items-center mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="text-blue-high w-5 h-5 md:w-6 md:h-6 text-blue-base w-6 h-6 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
        <path d="M12 9v4"></path>
        <path d="M12 17h.01"></path>
      </svg>
      
      <h2 class="text-xl md:text-2xl font-bold text-blue-dark">
        {value.title}
      </h2>
    </div>
    
    <!-- Content with clean styling -->
    <div class="text-md md:text-lg text-gray-high leading-relaxed pl-9" role="alert">
      <p>{@html value.text}</p>
    </div>
  </div>
</div>