<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import { useRacesStore, useDriverStandingsStore, useTeamStandingsStore, useResultsStore } from '@/stores'

const { loadRaces } = useRacesStore()
const { getFinishedRounds } = storeToRefs(useRacesStore())
const { loadDriverStandings } = useDriverStandingsStore()
const { loadTeamStandings } = useTeamStandingsStore()
const { loadResults } = useResultsStore()

import DesktopLayout from '@/layouts/DesktopLayout.vue'
import MobileLayout from '@/layouts/MobileLayout.vue'
import Dialog from '@/views/Dialog.vue'

const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greater('md')
onMounted(async () => {
  try {
    // load all stores concurrently except results
    await Promise.all([loadDriverStandings(), loadTeamStandings()])

    // load races first, since we need finished rounds
    await loadRaces()

    // now get the finished rounds
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