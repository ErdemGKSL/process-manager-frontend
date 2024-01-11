<script>
	import { browser } from "$app/environment";
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
  import Project from "$lib/ui/Project.svelte"
	import { redirect } from "@sveltejs/kit";

	// const Project = require("$lib/ui/Project.svelte");

  export let data;

  let projectId = data.projectId;

</script>

<div class="flex items-center justify-center w-full- h-full">
  <Project projectId={projectId} />
</div>