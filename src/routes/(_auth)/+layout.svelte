<script lang="ts">
	import { AppShell, AppBar, initializeStores, Modal, Toast, Drawer, getDrawerStore, CodeBlock } from '@skeletonlabs/skeleton';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import json from 'highlight.js/lib/languages/json';
	import prolog from 'highlight.js/lib/languages/prolog';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	hljs.registerLanguage('json', json);
	hljs.registerLanguage('prolog', prolog);

	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { AUTH } from '$lib';
	import { page } from '$app/stores';
	import { formatDuration } from '$lib/stuffs';
	import Icon from '@iconify/svelte';
    import DatePicker from '$lib/ui/DatePicker.svelte';
    import ChangeAndView from '$lib/ui/ChangeAndView.svelte';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	initializeStores();

	let drawerStore = getDrawerStore();
</script>

<Toast />
<Modal />
<Drawer >
	{#if $drawerStore.id === "process_edit"}
		<div class="flex flex-col items-start gap-2 p-4">
			<div class="font-thin text-2xl flex flex-row justify-between items-center gap-2 w-full">
				<h1 class="p-1 md:p-4 flex flex-row justify-start items-center w-full">
				   <span class="pr-2">{$drawerStore.meta.id}</span> -
				   <ChangeAndView class="pl-1/2 flex w-fit" inputClass="input px-2 py-1 font-bold w-full flex" innerClass="px-2 py-1 font-bold" bind:value={$drawerStore.meta.nameChange} defaultValue={$drawerStore.meta.name}/>
				</h1>
				<button class="btn variant-filled-error p-2" on:click={() => {
					drawerStore.close();
				}}>
					<Icon icon="ph:x-bold" class="w-6 h-6" />
				</button>
			</div>

			<!-- -- <CodeBlock code={JSON.stringify($drawerStore.meta, null, 2)} language="json" /> -->
			<!--
			make an elegant styled with tailwind to render #drawerStore.meta with the example json file of: {
                "cmd": "./start.sh",
                "dir": "/home/erdem/other/cbot2",
                "id": 8,
                "name": "CBot2",
                "process_id": 2123113,
                "until": null,
                "users": [
                    2,
                    3
                ]
            }
		 -->
			{#if $drawerStore.meta}
				<div class="px-4 rounded-lg w-full flex gap-2 flex-col">
    				<div class="w-full flex flex-row items-center">
                        <p class="font-bold pr-2">Command:</p>
                        <ChangeAndView class="h-8" inputClass="input px-2 py-1" innerClass="px-2 py-1" bind:value={$drawerStore.meta.cmdChange} defaultValue={$drawerStore.meta.cmd}/>
    				</div>
                    <div class="w-full flex flex-row items-center">
                        <p class="font-bold pr-2">Folder:</p>
                        <ChangeAndView class="h-8" inputClass="input px-2 py-1" innerClass="px-2 py-1" bind:value={$drawerStore.meta.dirChange} defaultValue={$drawerStore.meta.dir}/>
    				</div>
                    <div class="w-full flex flex-col justify-center">
        				{#if $drawerStore.meta.until !== null}
           					<p class="text-sm font-bold">Time Remaining:</p>
                            <p class="text-sm">
                                {formatDuration(new Date($drawerStore.meta.until).getTime() - Date.now(), undefined)}
                            </p>
                            <p class="font-bold pr-2 mt-4">
                                Until:
                            </p>
           					<DatePicker bind:date={$drawerStore.meta.untilChange} defaultValue={new Date($drawerStore.meta.until)} />
        				{:else}
                            <p class="font-bold pr-2">
                                Until:
                            </p>
        				    <DatePicker bind:date={$drawerStore.meta.untilChange} />
        				{/if}
    				</div>
    			</div>
				<div class="w-full flex flex-row-reverse">
				    <button class="btn variant-filled-success" on:click={async () => {
						const untilValue = $drawerStore.meta?.untilChange?.toDate().toJSON().slice(0, -1);
						const updateObject = {
						  name: $drawerStore.meta.name === $drawerStore.meta.nameChange ? undefined : $drawerStore.meta.nameChange,
						  cmd: $drawerStore.meta.cmd === $drawerStore.meta.cmdChange ? undefined : $drawerStore.meta.cmdChange,
						  dir: $drawerStore.meta.dir === $drawerStore.meta.dirChange ? undefined : $drawerStore.meta.dirChange,
						  until: $drawerStore.meta.until == $drawerStore.meta.untilChange ? undefined : ((untilValue && {
						    Date: untilValue
						  })|| "Infinite")
						};

						console.log({ updateObject });
						await fetch(`https://manager.erdemdev.tr/api/process/${$drawerStore.meta.id}`, {
    						method: "PATCH",
    						headers: {
     							"Authorization": `${$AUTH.TOKEN}`,
     							"Content-Type": "application/json"
    						},
    						body: JSON.stringify(updateObject)
						})

					}}>Save</button>
				</div>
			{/if}
		</div>
	{:else if $drawerStore.id === "process_members_edit"}
	   <div class="mt-4">
			<p class="font-bold">Users:</p>
			<ul class="list-disc pl-4">
			{#each $drawerStore.meta.users as user}
			<li>{user}</li>
			{/each}
			</ul>
		</div>
		<div class="w-full flex flex-col">
			<p>
				Add user with id
			</p>
			<label class="rounded-token variant-soft-primary p-1 md:p-4 flex flex-col items-start justify-center w-full">
				<input type="number" class="bg-transparent w-full" on:keydown={async (e) => {
					let target = e.currentTarget;
					if (e.key === "Enter" && !target.disabled) {
						let value = parseInt(target.value);
						target.value = "";
						target.disabled = true;

						let res = await fetch(`https://manager.erdemdev.tr/api/process/${$drawerStore.meta.id}/users`, {
							method: "PUT",
							headers: {
								"Authorization": `${$AUTH.TOKEN}`,
								"Content-Type": "application/json"
							},
							body: JSON.stringify({
								user_id: value
							})
						}).then(r => r?.json().catch(() => null)).catch(() => null);

						$drawerStore.meta.users.push(value);

						target.disabled = false;
					}
				}}>
			</label>
		</div>
	{/if}
</Drawer>
<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Management UI</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if $AUTH.ADMIN}
					<a class="hidden md:flex btn {$page.url.pathname.startsWith("/admin") ? "variant-ghost-secondary" : "variant-filled-secondary"}" href="/admin">
						Admin
					</a>
				{/if}
				<a href="/" class="btn {$page.url.pathname.startsWith("/admin") ? "variant-filled-secondary" : "variant-ghost-secondary"}">
					Projects
				</a>
				<button class="btn variant-filled-error" on:click={() => {
					localStorage.removeItem('token');
					location.reload();
				}}>
					Quit
				</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<!-- <div class="overflow-scroll"> -->
		<slot />
	<!-- </div> -->
</AppShell>
