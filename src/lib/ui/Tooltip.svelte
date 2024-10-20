<script lang="ts">
  import { Tooltip } from "bits-ui";
  import { fade } from "svelte/transition";
  export let content = "Make some magic!";
</script>

<Tooltip.Root openDelay={0}>
  <Tooltip.Trigger {...$$restProps}>
    <slot />
  </Tooltip.Trigger>
  <Tooltip.Content
    transition={fade}
    transitionConfig={{ duration: 150 }}
    sideOffset={8}
  >
    <div class="bg-background">
      <Tooltip.Arrow class="rounded-[2px] border-l border-t border-primary-500" />
    </div>
    <div
      class="flex items-center justify-center rounded-input border border-primary-700 bg-surface-900 p-3 text-sm font-medium shadow-popover outline-none rounded-token"
    >
      {content}
    </div>
  </Tooltip.Content>
</Tooltip.Root>
