<script>
  import Project from "$lib/ui/Project.svelte"

  export let data;

  let projectId = data.projectId;

</script>

<div class="flex items-center justify-center w-full h-full">
  <Project projectId={projectId} />
</div>