<script lang="ts">
  let { title, text, alignment } = $props();
</script>

<h2 class="text-xl md:text-3xl font-bold uppercase w-4/5 mx-auto mt-4 md:mt-8 {alignment}">
  {title}
</h2>
{#if text}
<div class="text-lg md:text-xl w-10/12 md:w-4/5 mx-auto mt-3 md:mt-4 {alignment}">
  {@html text}
</div>
{/if}
