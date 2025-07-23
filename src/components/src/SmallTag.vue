<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  label: string
}>()
</script>

<template>
  <span class="font-bold bg-violet-100 px-1.5 py-0.5 rounded">{{ label }}</span>
</template>
