<script lang="ts">
import { PUBLIC_SANITY_PROJECT_ID } from "$env/static/public";
import type {CustomBlockComponentProps} from '$lib/rendererTypes'
import { getFileAsset } from '@sanity/asset-utils'
  interface Props {
    portableText: CustomBlockComponentProps;
  }

  let { portableText }: Props = $props();
let {value} = $derived(portableText)

function fileFor(source) {
  return getFileAsset(source, {
    dataset: "production",
    projectId: PUBLIC_SANITY_PROJECT_ID
  })
}
</script>

<div class="my-6">
  <video autoplay controls loop>
    <source src="{fileFor(value.asset).url}" type="video/mp4">
  </video>
</div>
