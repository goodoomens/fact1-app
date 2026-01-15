<template>
  <div class="w-full px-6 py-4 cursor-pointer flex gap-4 items-center bg-white dark:bg-neutral-800 hover:brightness-95">
    <div class="relative">
      <slot name="image" />
      <div v-if="$slots.tag" class="absolute-center">
        <slot name="tag" />
      </div>
    </div>

    <div class="flex flex-col">
      <div class="flex items-center">
        <div class="text-xs text-neutral-500 dark:text-white uppercase">
          <slot name="subtitle" />
        </div>
      </div>
      <div class="font-medium text-neutral-800  dark:text-white whitespace-nowrap">
        <slot name="title" />
      </div>
    </div>

    <div class="ml-auto self-start text-xs text-neutral-500 dark:text-white flex flex-col gap-1 items-end text-right w-fit">
      <div class="whitespace-nowrap">
        <slot name="date" />
      </div>
      <slot name="badge" />
    </div>

    <slot name="append" />
  </div>
</template>

<script setup lang="ts">
</script>
