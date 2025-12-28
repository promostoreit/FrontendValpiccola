<script>
import { page } from '$app/stores';
import { navigating } from '$app/stores';
import { registerEvent } from '$lib/functions/registerEvent.ts'

let canTrigger50 = $state(true);
  
let canTriggerBottom = $state(true);
  

$effect(() => {
    if($navigating) {
    canTrigger50 = true;
  }
  });

function handleScroll() {
  let triggerPoint50 = 0.50 * document.body.scrollHeight;
  const scrollPos = window.scrollY || window.pageYOffset;
  if (scrollPos >= triggerPoint50 && canTrigger50) {
    canTrigger50 = false;
    registerEvent($page.url.href, "Scroll 50%", false, {});
  }
  if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
    if (canTriggerBottom) {
      canTriggerBottom = false;
      registerEvent($page.url.href, "Scroll Bottom", false, {});
    }
  }
}

</script>

<svelte:window
  onscroll={handleScroll}
/>
