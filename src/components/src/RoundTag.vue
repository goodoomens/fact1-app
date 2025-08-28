<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  label: string
}>()
</script>

<template>
  <div class="w-12 h-12 rounded-full relative flex items-center justify-center shadow-lg">
    <div class="w-8 h-8 rounded-full outline-4 outline-offset-4 outline-blue-500" />
    <div
      class="mb-1 rounded absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 uppercase text-[0.5rem] font-black px-1 py-0.5 bg-blue-500 text-white"
    >
      {{ label }}
    </div>
  </div>
</template>
