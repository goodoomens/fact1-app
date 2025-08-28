<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  idImageMap: Record<string, string>
  id: string
  size?: Size
  rounded?: 'circle' | 'corners' | 'square'
  description?: string
}>()

type Size = keyof typeof sizeMap
const sizeMap = {
  'xs': 'w-4',
  'sm': 'w-6',
  'md': 'w-8',
  'lg': 'w-10',
  'xl': 'w-12',
  '2xl': 'w-16'
}

const classMap = {
  circle: 'rounded-full',
  corners: 'rounded',
  square: 'rounded-none'
}
</script>

<template>
  <img :class="[idImageMap[id] ? classMap[rounded || 'square'] : classMap['square'], sizeMap[size || 'md']]"
       :src="idImageMap[id] || idImageMap['default']" :alt="description" />
</template>
