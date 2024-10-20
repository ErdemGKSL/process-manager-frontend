<script lang="ts">
  export let edit = false;

  export let innerClass = "";
  export let inputClass = "";

  export let defaultValue: string | undefined = undefined;
  export let value = defaultValue || "";
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div {...$$restProps} on:mouseenter={() => edit = true } on:mouseleave={() => edit = false }>
  {#if edit}
      <input type="text" bind:value={value} class={inputClass} />
  {:else}
      <p class={innerClass}>{value}</p>
  {/if}
</div>
