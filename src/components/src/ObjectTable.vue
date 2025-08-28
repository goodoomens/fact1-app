<script setup lang="ts">
import { defineProps } from 'vue'

const columnsMap = {
  '1/1': 'grid-cols-[1fr_1fr]',
  '1/2': 'grid-cols-[1fr_2fr]',
  '2/1': 'grid-cols-[2fr_1fr]',
  '1/3': 'grid-cols-[1fr_3fr]',
  '3/1': 'grid-cols-[3fr_1fr]',
  '2/3': 'grid-cols-[2fr_2fr]',
  '3/2': 'grid-cols-[2fr_3fr]'
}

const props = defineProps<{
  title: string
  items: Record<string, string>
  columns?: keyof typeof columnsMap
}>()

const isLastEntry = (idx: number) =>
  idx === Object.entries(props.items).length - 1
</script>

<template>
  <div class="outline outline-neutral-200 dark:outline-neutral-900 rounded-lg overflow-hidden">
    <div
      class="px-3 py-2 uppercase font-bold text-center text-xs bg-neutral-100 dark:bg-neutral-900 tracking-wider"
    >
      {{ title }}
    </div>
    <div
      class="grid gap-x-2 text-sm"
      :class="columns ? columnsMap[columns] : columnsMap['1/1']"
    >
      <template v-for="([key, value], idx) in Object.entries(items)">
        <span class="pl-3 py-2 flex items-start justify-start">
          <slot v-if="$slots.key" name="key" :props="{ key, value }" />
          <span v-else>{{ key }}</span>
        </span>
        <span class="pr-3 py-2 flex items-start justify-end">
          <slot v-if="$slots.value" name="value" :props="{ key, value }" />
          <span v-else>{{ value }}</span>
        </span>
        <hr v-if="!isLastEntry(idx)" class="col-span-2 border-neutral-300 dark:border-neutral-900" />
      </template>
    </div>
  </div>
</template>
