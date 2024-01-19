<script lang="ts">
  import ProjectUI from "$lib/ui/Project.svelte";

  export let projectId: number = -1;

	import type { SvelteComponent } from 'svelte';

	import { getModalStore } from '@skeletonlabs/skeleton';
	import { DATA } from "$lib";

	export let parent: SvelteComponent;

	const modalStore = getModalStore();

	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
</script>


{#if $modalStore[0]}
	<div class="modal-example-form {cBase} {$DATA.LOADING ? "hidden" : ""}">
    <ProjectUI {projectId} />
		<footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
		</footer>
	</div>
{/if}