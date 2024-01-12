<script lang="ts">
	import { AUTH, DATA } from "$lib";
	import { CodeBlock, getModalStore } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";
	import { onMount } from "svelte";
	import { pushState } from "$app/navigation";
	import { page } from "$app/stores";
	import ProjectModal from "$lib/ui/ProjectModal.svelte";

  let projects: any[] = [];

  onMount(async () => {
    $DATA.LOADING = true;

    projects = (await fetch("https://api-manager.erdemg.dev/process", {
      cache: "no-cache",
      headers: {
        Authorization: `${$AUTH.TOKEN}`,
      },
    }).then((r) => r?.json().catch(() => null)).catch(() => null))?.data || [];

    $DATA.LOADING = false;
  });

  let modalStore = getModalStore();
  let currentModalId: any = null;

  // $: {
  //   if (($page.state as any).projectModalId) {
  //     let modalId = ($page.state as any).projectModalId;
      
  //   } 
  // }

</script>

<!-- <CodeBlock code={JSON.stringify(projects, null, 2)} language="json"/> -->

<div class="flex justify-center w-full p-4 flex-col gap-6">
  <div class="flex flex-row px-10 justify-between">
    <h1 class="font-semibold text-2xl">
      ID: {$AUTH.ID}
      {#if $AUTH.ADMIN}
        <span class="text-sm font-normal text-gray-400">
          (Admin)
        </span>
      {/if}
    </h1>

    <button class="w-12 h-12 variant-ghost-tertiary p-2 btn rounded-full" on:click={async (e) => {
      let target = e.currentTarget;
      target.disabled = true;

      projects = (await fetch("https://api-manager.erdemg.dev/process", {
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
  {#each projects as p}
      <div class="w-full variant-ghost-primary py-2 px-6 rounded-token flex flex-row items-center text-center justify-between">
        <div class="w-4 h-4 rounded-full {p.process_id ? "variant-filled-success": "variant-filled-error"}" />
        <p class="font-mono font-semibold">
          {p.name}
          {#if p.until}
            <code>
              {
                new Date(p.until).toLocaleString()
              }
            </code>
          {/if}
        </p>
        <a href="/project/{p.id}" on:click={(e) => {
          if (e.metaKey || e.ctrlKey) return;
          e.preventDefault();

          pushState(`/project/${p.id}`, {
            projectModalId: p.id
          });

          modalStore.trigger({
            type: "component",
            component: {
              ref: ProjectModal,
              props: {
                projectId: p.id,
              }
            },
            response(r) {
              history.back();
            },
          });
        }}>
          <Icon icon="clarity:angle-line" class="w-6 h-6 font-extrabold" />
        </a>
      </div>
  {/each}
</div>