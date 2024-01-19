<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	import { getModalStore } from '@skeletonlabs/skeleton';

	export let parent: SvelteComponent;

	const modalStore = getModalStore();

	const formData = {
		name: '',
		dir: '',
		cmd: ''
	};

	// We've created a custom submit function to pass the response and close the modal.
	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(formData);
		modalStore.close();
	}

	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>


{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>Add Project</header>
		<form class="modal-form {cForm}">
			<label class="label">
				<span>Name</span>
				<input class="input p-1" type="text" bind:value={formData.name} placeholder="Enter name..." />
			</label>
			<label class="label">
				<span>Directory</span>
				<input class="input p-1" type="text" bind:value={formData.dir} placeholder="Enter Directory..." />
			</label>
			<label class="label">
				<span>Command</span>
				<input class="input p-1" type="text" bind:value={formData.cmd} placeholder="Enter Command..." />
			</label>
		</form>
		<footer class="modal-footer {parent.regionFooter}">
			<button class="btn variant-filled-error" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
			<button class="btn variant-filled-secondary" on:click={onFormSubmit}>Add Project</button>
		</footer>
	</div>
{/if}