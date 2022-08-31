<template>
  <div
    class="flex items-start max-w-container m-auto px-2"
  >
    <div
      class="sticky z-[10] top-header h-(screen-header) w-1/4 hidden md:block overflow-auto"
    >
      <slot name="aside-content-aside" />
    </div>

    <div class="pt-12 md:pt-8 relative md:w-3/4 w-full mb-4">
      <div>
        <slot name="aside-content-header" />
      </div>

      <div>
        <slot name="aside-content-main" />
      </div>
    </div>
  </div>
</template>
