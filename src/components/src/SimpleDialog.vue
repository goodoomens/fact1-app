<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { onClickOutside } from '@vueuse/core'

import Overlay from './Overlay.vue'

defineProps<{
  className?: string
  end?: boolean,
  overlay?: boolean
}>()

const isOpen = ref<boolean>(false)
const toggle = () => isOpen.value = !isOpen.value
const close = () => isOpen.value = false

const dialog = useTemplateRef<HTMLElement>('dialog')
onClickOutside(dialog, close)
</script>

<template>
  <div ref="dialog" class="relative flex flex-col z-50" :class="{ 'items-end': end }">
    <slot name="activator" :toggle="toggle" />
    <transition mode="out-in">
      <div
        v-if="isOpen"
        class="min-w-max absolute top-full bg-white dark:bg-neutral-800 p-5 rounded shadow-xl"
        :class="className"
      >
        <slot />
      </div>
    </transition>
  </div>
  <Overlay v-if="overlay" v-model="isOpen" />
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}
</style>