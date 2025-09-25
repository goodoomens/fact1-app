<script setup lang="ts">
defineProps<{
  className?: string,
  image: string,
}>()
</script>

<template>
  <div class="p-1 h-16 aspect-square">
    <div class="overflow-hidden rounded-full"
         :class="className || 'bg-neutral-200 dark:bg-neutral-900'"
    >
      <img class="h-full w-full object-center object-contain"
           :src="image"
      />
    </div>
  </div>
</template>
