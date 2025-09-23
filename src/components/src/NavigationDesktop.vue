<script setup lang="ts">
import { useRouting } from '@/composables'
import type { NavigationItem } from '@/models'

const { isActive } = useRouting()

defineProps<{
  items: NavigationItem[],
}>()

</script>

<template>
  <div class="flex gap-5">
    <template v-for="item in items" :key="item.routeName">
      <div class="flex flex-col">
        <router-link
          class="rounded text-md text-white flex items-center gap-3 w-full transition-all hover:opacity-100 whitespace-nowrap p-2"
          :class="{ 'opacity-50': !isActive(item.routeName) }"
          :to="{ name: item.routeName }"
        >
          <i :class="item.icon" />
          {{ $t(item.labelKey) }}
        </router-link>
      </div>
    </template>
  </div>
</template>
