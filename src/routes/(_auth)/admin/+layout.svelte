<div class="flex-col h-full fixed w-[250px] bg-surface-900 p-5 gap-5 hidden md:flex">
  <a class="btn variant-ghost-secondary z-50" href="/admin/process">Process</a>
  <a class="btn variant-ghost-secondary z-50" href="/admin/user">User</a>
</div>
<div class="w-full h-full relative pointer-events-none">
  <div class="min-h-full md:w-[calc(100%-250px)] w-full overflow-y-scroll absolute right-0 top-0 pointer-events-auto">
    <slot />
  </div>
</div>