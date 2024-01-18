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
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	initializeStores();

	let drawerStore = getDrawerStore();
	
</script>

<Toast />
<Modal />
<Drawer >
	{#if $drawerStore.id === "process_edit"}
		<div class="flex flex-col items-start gap-8 p-4">
			<div class="font-thin text-2xl flex flex-row justify-between items-center gap-2 w-full">
				<h1 class="p-1 md:p-4">
					{$drawerStore.meta.id} - <span class="font-bold">{$drawerStore.meta.name}</span>
				</h1>
				<button class="btn variant-filled-error p-2" on:click={() => {
					drawerStore.close();
				}}>
					<Icon icon="ph:x-bold" class="w-6 h-6" />
				</button>
			</div>
			{#if $drawerStore.meta.until}
				{formatDuration($drawerStore.meta.until - Date.now(), undefined)}
			{/if}
			<CodeBlock code={JSON.stringify($drawerStore.meta, null, 2)} language="json" />
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

							let res = await fetch(`https://api-manager.erdemg.dev/process/${$drawerStore.meta.id}/users`, {
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
		</div>
	{/if}
</Drawer>
<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
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
