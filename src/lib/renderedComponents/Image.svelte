<script lang="ts">
import { buildSanityImage } from '$lib/functions/buildSanityImage';
import type {CustomBlockComponentProps} from '$lib/rendererTypes'
interface Props {
  portableText: CustomBlockComponentProps;
}

let { portableText }: Props = $props();
let {value} = $derived(portableText)
</script>

<section class="p-2 mx-auto my-8 md:px-8 flex justify-center w-11/12 sm:w-2/3">
  <figure class="rounded-md">
    <img
      src={ buildSanityImage(value.asset).width(600).url() } 
      alt="{ value.alt }"
      title="{ value.title }"
    />
  </figure>
</section>
