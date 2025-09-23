<script setup lang="ts">
const model = defineModel()

defineProps<{
  options: string[]
}>()
</script>

<template>
  <div class="flex rounded-md overflow-hidden">
    <template v-for="option in options" :key="option">
      <Button
        size="small"
        :label="option"
        :pt="{ root: { class: ['bg-blue-600 dark:text-white border-none rounded-none w-full', model === option ? '' : 'opacity-50'] } }"
        @click="model = option"
      />
    </template>
  </div>
</template>