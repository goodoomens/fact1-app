<script setup lang="ts">
import { onMounted } from 'vue'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import { useRacesStore, useDriverStandingsStore, useTeamStandingsStore } from '@/stores'

const { loadRaces } = useRacesStore()
const { loadDriverStandings } = useDriverStandingsStore()
const { loadTeamStandings } = useTeamStandingsStore()

import DesktopLayout from '@/layouts/DesktopLayout.vue'
import MobileLayout from '@/layouts/MobileLayout.vue'
import Dialog from '@/views/Dialog.vue'

const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greater('md')
onMounted(() => {
  loadRaces()
  loadDriverStandings()
  loadTeamStandings()
})
</script>

<template>
  <div class="bg-neutral-100 dark:bg-neutral-900 h-dvh flex flex-col relative">
    <Dialog />
    <DesktopLayout v-if="isDesktop" />
    <MobileLayout v-else />
    <router-view
      class="bg-white dark:bg-neutral-800 shadow-lg mx-auto max-w-3xl overflow-y-scroll overscroll-none"
      :class="{ 'mt-10 rounded-t-lg': isDesktop }"
    />
  </div>
</template>