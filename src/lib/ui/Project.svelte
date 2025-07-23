<script lang="ts">
	import { browser } from "$app/environment";
	import { AUTH, DATA } from "$lib";
	import Icon from "@iconify/svelte";
	import { CodeBlock } from "@skeletonlabs/skeleton";
	import { onMount } from "svelte";


  export let projectId: number = -1;

  let projectData: any = null;
  let logs = "";

  async function recursiveLogFetch(times = 3, wait = 5000) {
    if (times <= 0) return;

    logs = (await fetch(`https://manager.erdemdev.tr/api/process/${projectId}/logs`, {
      cache: "no-cache",
      headers: {
        Authorization: `${$AUTH.TOKEN}`,
      },
    //@ts-ignore
    }).then((r) => r?.json().catch(() => null)).catch(() => null))?.data || "NO LOGS";

    logs = logs.replaceAll(/(\\033|\033)\[\d+(;\d+)?m/g, "");

    await new Promise((r) => setTimeout(r, wait));

    return await recursiveLogFetch(times - 1, wait);
  }

  async function recursiveProjectFetch(times = 3, wait = 5000) {
    if (times <= 0) return;

    projectData = (await fetch(`https://manager.erdemdev.tr/api/process/${projectId}`, {
      cache: "no-cache",
      headers: {
        Authorization: `${$AUTH.TOKEN}`,
      },
    //@ts-ignore
    }).then((r) => r?.json().catch(() => null)).catch(() => null))?.data;
    
    await new Promise((r) => setTimeout(r, wait));

    return await recursiveProjectFetch(times - 1, wait);
  }

  onMount(async () => {
    $DATA.LOADING = true;

    if (browser) {
      await recursiveProjectFetch(1, 0);
      await recursiveLogFetch(1, 0);
    }

    $DATA.LOADING = false;
  });

</script>


{#if projectData}
  <div class="flex flex-col gap-4">
    <div class="flex flex-row justify-between">
      <span class="rounded-token w-8 h-8 text-xl text-center variant-ghost-tertiary">{projectData.id}</span>
      <h1 class="text-3xl text-center text-primary-500">{projectData.name}</h1>
      <span class="w-8 h-8 {projectData.process_id ? "variant-filled-success" : "variant-filled-error"} rounded-full"/>
    </div>
    <CodeBlock code={logs} language="prolog" color="max-h-[50vh] overflow-y-scroll flex flex-col-reverse text-white" />
    <div class="flex flex-row justify-around gap-3">
      <button class="btn sm:px-8 sm:py-2 px-6 py-1.5 variant-filled-success" on:click={async () => {
        let result = await fetch(`https://manager.erdemdev.tr/api/process/${projectId}`, {
          method: "POST",
          headers: {
            Authorization: `${$AUTH.TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            action: "Start"
          }),
        }).then((r) => r?.json().catch(() => null)).catch(() => null);

        if (result?.ok) {
          projectData.process_id = 1;
          projectData = projectData;
          recursiveLogFetch();
          recursiveProjectFetch();
        }
      }}>
        <Icon icon="gravity-ui:play-fill" class="sm:w-8 sm:h-8 w-6 h-6 text-white" />
      </button>
      <button class="btn sm:px-8 sm:py-2 px-6 py-1.5 variant-filled-warning" on:click={async () => {
        let result = await fetch(`https://manager.erdemdev.tr/api/process/${projectId}`, {
          method: "POST",
          headers: {
            Authorization: `${$AUTH.TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            action: "Restart"
          }),
        }).then((r) => r?.json().catch(() => null)).catch(() => null);

        if (result?.ok) {
          projectData.process_id = 1;
          projectData = projectData;
          recursiveLogFetch();
          recursiveProjectFetch();
        }
      }}>
        <Icon icon="icon-park-solid:replay-music" class="sm:w-8 sm:h-8 w-6 h-6 text-white" />
      </button>
      <button class="btn sm:px-8 sm:py-2 px-6 py-1.5 variant-filled-error" on:click={async () => {
        let result = await fetch(`https://manager.erdemdev.tr/api/process/${projectId}`, {
          method: "POST",
          headers: {
            Authorization: `${$AUTH.TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            action: "Stop"
          }),
        }).then((r) => r?.json().catch(() => null)).catch(() => null);

        if (result?.ok) {
          projectData.process_id = null;
          projectData = projectData;
          recursiveLogFetch(1);
          recursiveProjectFetch(1);
        }
      }}>
        <Icon icon="solar:stop-bold" class="sm:w-8 sm:h-8 w-6 h-6 text-white" />
      </button>
      <button class="btn sm:px-8 sm:py-2 px-6 py-1.5 variant-filled-success" on:click={async () => {
        recursiveLogFetch(1, 0);
        recursiveProjectFetch(1, 0);
      }}>
        <Icon icon="clarity:refresh-line" class="sm:w-8 sm:h-8 w-6 h-6 text-white" />
      </button>
    </div>
  </div>
{/if}