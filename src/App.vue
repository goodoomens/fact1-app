<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import { useRacesStore, useDriverStandingsStore, useTeamStandingsStore, useResultsStore } from '@/stores'

import DesktopLayout from '@/layouts/DesktopLayout.vue'
import MobileLayout from '@/layouts/MobileLayout.vue'
import Dialog from '@/pages/Dialog.vue'

const { loadRaces } = useRacesStore()
const { getFinishedRounds } = storeToRefs(useRacesStore())
const { loadDriverStandings } = useDriverStandingsStore()
const { loadTeamStandings } = useTeamStandingsStore()
const { loadResults } = useResultsStore()

const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greater('md')

onMounted(async () => {
  try {
    await Promise.all([loadDriverStandings(), loadTeamStandings()])
    await loadRaces()
    const roundsToLoad = getFinishedRounds.value
    if (roundsToLoad.length) {
      await loadResults(roundsToLoad)
    }
  } catch (err) {
    console.error('Error loading data:', err)
  }
})
</script>

<template>
  <div class="relative bg-neutral-100 dark:bg-neutral-900 h-dvh flex flex-col" id="wrapper">
    <Dialog />
    <DesktopLayout v-if="isDesktop" />
    <MobileLayout v-else />
    <Transition>
      <router-view
        class="bg-white dark:bg-neutral-800 shadow-lg mx-auto max-w-3xl overflow-y-scroll overscroll-none"
        :class="{ 'mt-10 rounded-t-lg': isDesktop }"
      />
    </Transition>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>