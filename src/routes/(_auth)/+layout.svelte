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
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	initializeStores();

	let drawerStore = getDrawerStore();
	
</script>

<Toast />
<Modal />
<Drawer >
	{#if $drawerStore.id === "process_edit"}
		<div class="flex flex-col items-center gap-8 p-4">
			<h1 class="font-thin text-2xl">{$drawerStore.meta.id} - <span class="font-bold">{$drawerStore.meta.name}</span></h1>
			{#if $drawerStore.meta.until}
				{formatDuration($drawerStore.meta.until - Date.now(), undefined)}
			{/if}
			<CodeBlock code={JSON.stringify($drawerStore.meta, null, 2)} language="json" />
			<label class="rounded-token variant-ghost-primary p-1 flex flex-col items-center justify-center">
				<p class="">
					Add user with id
				</p>
				<input type="number" class="bg-transparent w-30">
			</label>
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
