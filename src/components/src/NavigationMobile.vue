<script setup lang="ts">
import type { NavigationItem } from '@/models'

const model = defineModel()

defineProps<{
  items: NavigationItem[],
}>()
</script>

<template>
  <div class="bg-[rgba(255,255,255,0.8)] dark:bg-[rgba(0,0,0,0.8)] backdrop-blur-md absolute left-0 w-full"
       data-ident="menu">
    <div
      v-if="model"
      class="mx-auto max-w-3xl flex flex-col items-start w-full h-screen"
    >
      <template v-for="item in items" :key="item.routeName">
        <router-link
          class="text-md text-neutral-900 dark:text-white font-medium px-8 py-5 flex items-center gap-5 w-full hover:bg-[rgba(0,0,0,0.1)] transition-all"
          :to="{ name: item.routeName }" @click="model = !model"
        >
          <i :class="item.icon" />
          {{ $t(item.labelKey) }}
        </router-link>
        <hr class="w-full border-neutral-300 dark:border-neutral-800" />
      </template>
      <slot name="append" />
    </div>
  </div>
</template>
