<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <h2 class="text-4xl font-semibold">{{ label }}</h2>
</template>
