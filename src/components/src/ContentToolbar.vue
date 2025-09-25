<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useScroll } from '@vueuse/core'

const container = useTemplateRef<HTMLElement>('container')
const { arrivedState } = useScroll(container)
</script>

<template>
  <div class="w-full h-full flex flex-col" ref="container">
    <div class="flex p-4 sticky top-0 bg-white dark:bg-neutral-800 transition-shadow z-10"
         :class="{ 'shadow-xl': !arrivedState.top, 'border-b border-neutral-200 dark:border-neutral-900': arrivedState.top }">
      <slot name="toolbar" />
    </div>
    <slot name="content" />
  </div>
</template>
