<script lang="ts">
import { page } from '$app/stores';
import { registerEvent } from '$lib/functions/registerEvent.ts'
import type {CustomBlockComponentProps} from '$lib/rendererTypes'
  interface Props {
    portableText: CustomBlockComponentProps;
  }

  let { portableText }: Props = $props();
let {value} = $derived(portableText)

function triggerEvent(event_detail) {
  registerEvent(
    $page.url.href,
    "click_button",
    false,
    {
      event_detail: event_detail
    }
  );
}
</script>

<div class="btn hover:bg-blue-base bg-blue-light flex mx-auto w-fit rounded-lg border-0 shadow">
  <a 
    class="text-blue-dark" 
    href="{value.link}"
    target="_blank"
    onclick={() => triggerEvent(value.event_detail)}>
    {value.title}
  </a>
</div>
