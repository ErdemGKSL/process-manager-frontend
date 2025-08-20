<script lang="ts">
	import { AUTH, DATA } from "$lib";
	import { CodeBlock, getModalStore } from "@skeletonlabs/skeleton";
    import Icon from "@iconify/svelte";
	import { onMount } from "svelte";
	import { pushState } from "$app/navigation";
	import { page } from "$app/stores";
	import ProjectModal from "$lib/ui/ProjectModal.svelte";
    import Tooltip from "$lib/ui/Tooltip.svelte";
    import { formatDuration } from "$lib/stuffs";

  let projects: any[] = [];

  onMount(async () => {
    $DATA.LOADING = true;

    projects = ((await fetch("https://manager.erdemdev.tr/api/process", {
      cache: "no-cache",
      headers: {
        Authorization: `${$AUTH.TOKEN}`,
      },
    }).then((r) => r?.json().catch(() => null)).catch(() => null))?.data || []).sort((a, b) => b.id - a.id);

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

      projects = ((await fetch("https://manager.erdemdev.tr/api/process", {
        cache: "no-cache",
        headers: {
          Authorization: `${$AUTH.TOKEN}`,
        },
      }).then((r) => r?.json().catch(() => null)).catch(() => null))?.data || []).sort((a, b) => b.id - a.id);

      target.disabled = false;
    }}>
      <Icon icon="clarity:refresh-line" class="w-full h-full" />
    </button>
  </div>
  <div class="flex flex-col w-full shadow-black/20 shadow-xl">
    {#each projects as p, i}
        <div class="w-full {i % 2 ? "bg-secondary-800/20" : "bg-secondary-500/20"} py-2 px-6 flex flex-row items-center text-center justify-between">
          <div class="flex flex-row justify-center items-center gap-4 cursor-default">
            <div class="w-4 h-4 rounded-full {p.process_id ? "variant-filled-success": "variant-filled-error"} relative" />
            {#if p.until}
                <Tooltip content="In {formatDuration(new Date(p.until).getTime() - Date.now(), undefined)}" class="left-20 cursor-default hidden md:flex absolute whitespace-nowrap">
                    <code class="bg-black/20 p-1">
                        {
                            new Date(p.until).toLocaleDateString()
                        }
                    </code>
                </Tooltip>
            {/if}
          </div>
          <p class="font-mono font-semibold">
            {p.name}
          </p>
          <a href="/project/{p.id}" class="btn p-2 rounded-token variant-filled-secondary shadow-md shadow-black/50" on:click={(e) => {
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
            <Icon icon="fluent:open-28-filled" class="w-6 h-6 text-white" />
          </a>
        </div>
    {/each}

  </div>
</div>
