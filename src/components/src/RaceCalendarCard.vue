<template>
  <div class="px-6 py-4 cursor-pointer flex gap-4 items-center bg-white hover:brightness-95">
    <div class="relative">
      <slot name="image" />
      <div v-if="$slots.tag" class="absolute-center">
        <slot name="tag" />
      </div>
    </div>

    <div class="flex flex-col">
      <div class="flex items-center">
        <div class="text-xs text-gray-500 uppercase">
          <slot name="subtitle" />
        </div>
      </div>
      <div class="font-medium text-gray-800 whitespace-nowrap">
        <slot name="title" />
      </div>
    </div>

    <div class="ml-auto self-start text-xs text-gray-500 flex flex-col gap-1 items-end text-right w-fit">
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
