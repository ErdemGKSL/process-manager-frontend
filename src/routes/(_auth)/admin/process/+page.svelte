<script lang="ts">
	import { browser } from "$app/environment";
	import { DATA, AUTH } from "$lib";
	import Icon from "@iconify/svelte";
	import { CodeBlock } from "@skeletonlabs/skeleton";
	import { onMount } from "svelte";


  let data: any = null;

  async function fetchProcessesRecursive(times = 3, timeout = 5000) {
    if (times <= 0) return;

    data = (await fetch("https://api-manager.erdemg.dev/process", {
      cache: "no-cache",
      headers: {
        Authorization: `${$AUTH.TOKEN}`,
      },
    }).then((r) => r?.json().catch(() => null)).catch(() => null))?.data || [];

    await new Promise((r) => setTimeout(r, timeout));

    return await fetchProcessesRecursive(times - 1, timeout);
  }

  onMount(async () => {
    if (browser) {
      $DATA.LOADING = true;
      
      await fetchProcessesRecursive(1, 0);

      $DATA.LOADING = false;
    }
  });

</script>

<div class="p-6 flex flex-col gap-4">
  <div class="flex flex-row items-center justify-between">
    <h1 class="font-semibold text-2xl">Processes</h1>
    <div class="flex flex-row h-full gap-2 items-center justify-center">
      <button class="w-12 h-12 variant-ghost-tertiary p-0 btn rounded-full">
        <Icon icon="majesticons:plus-line" class="w-full h-full" />
      </button>
      <button class="w-12 h-12 variant-ghost-tertiary p-2 btn rounded-full" on:click={async (e) => {
        let target = e.currentTarget;
        target.disabled = true;
  
        data = (await fetch("https://api-manager.erdemg.dev/process", {
          cache: "no-cache",
          headers: {
            Authorization: `${$AUTH.TOKEN}`,
          },
        }).then((r) => r?.json().catch(() => null)).catch(() => null))?.data || [];
  
        target.disabled = false;
      }}>
        <Icon icon="clarity:refresh-line" class="w-full h-full" />
      </button>
    </div>
  </div>
  <div class="flex flex-col gap-4">
    {#if data}
      {#each data as d}
        <div class="w-full variant-ghost-primary py-2 px-6 rounded-token flex flex-row items-center text-center justify-between">
          <div class="flex flex-row justify-center items-center gap-4 text-center">
            <span class="w-4 h-4 rounded-full {d.process_id ? "variant-filled-success": "variant-filled-error"}" />
            <p class="font-mono font-semibold w-8">
              {d.process_id || "None"}
            </p>
          </div>
          <p class="font-mono font-semibold text-center">
            {d.name}
          </p>
          <div class="flex text-center items-center justify-center gap-3">
            
            <button class="btn variant-filled-tertiary p-2">
              <Icon icon="mdi:pen" class="w-6 h-6" />
            </button>
            <button class="btn variant-filled-error p-2">
              <Icon icon="ph:x-bold" class="w-6 h-6" />
            </button>
          </div>
        </div>
      {/each}
    {/if}
</div>
</div>

<!-- <CodeBlock code={JSON.stringify(data, null, 2)} language="json"/> -->