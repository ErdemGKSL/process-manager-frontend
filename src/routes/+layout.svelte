<script lang="ts">
	import '../app.postcss';
	import { browser } from '$app/environment';
	import { AUTH, DATA } from '$lib';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	if (browser) {
		$DATA.LOADING = true;

		$AUTH.TOKEN = localStorage.getItem('token') ?? null;

		onMount(async () => {
			let auth: any = await fetch('https://api-manager.erdemg.dev/auth', {
				cache: 'no-cache',
				headers: {
					'Authorization': `${$AUTH.TOKEN}`
				}
			}).then(r => r?.json().catch(() => null));
	
			if (!$page.url.pathname.startsWith('/auth')) {
				if (!auth?.data?.id) {
					goto('/auth/login');
				}
			} else {
				if (auth?.data?.id) {
					goto('/');
				}
			}

			if (auth?.data?.id) {
				$AUTH.ADMIN = auth?.data?.admin;
				$AUTH.ID = auth?.data?.id;
			}

			$DATA.LOADING = false;
		});
	}

</script>

{#if $DATA.LOADING}
	<div class="w-screen h-screen top-0 left-0 fixed flex justify-center items-center bg-surface-backdrop-token z-[999999999999]">
		<ProgressRadial size="large" />
	</div>
{/if}
<slot/>
