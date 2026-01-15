<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import { useRacesStore, useDriverStandingsStore, useTeamStandingsStore, useResultsStore, useConfigStore } from '@/stores'

import DesktopLayout from '@/layouts/DesktopLayout.vue'
import MobileLayout from '@/layouts/MobileLayout.vue'
import Dialog from '@/pages/Dialog.vue'

const racesStore = useRacesStore()
const { loadRaces } = racesStore
const { getFinishedRounds, isLoaded: racesLoaded } = storeToRefs(racesStore)

const driverStandingsStore = useDriverStandingsStore()
const { loadDriverStandings } = driverStandingsStore
const { isLoaded: driverStandingsLoaded } = storeToRefs(driverStandingsStore)

const teamStandingsStore = useTeamStandingsStore()
const { loadTeamStandings } = teamStandingsStore
const { isLoaded: teamStandingsLoaded } = storeToRefs(teamStandingsStore)

const resultsStore = useResultsStore()
const { loadResults } = resultsStore
const { isLoaded: resultsLoaded } = storeToRefs(resultsStore)

const configStore = useConfigStore()
const { currentYear } = storeToRefs(configStore)

const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = breakpoints.greater('md')

const loadAllData = async () => {
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
}

const resetLoadedStates = () => {
  racesLoaded.value = false
  driverStandingsLoaded.value = false
  teamStandingsLoaded.value = false
  resultsLoaded.value = false
  resultsStore.results = []
  resultsStore.calendarResults = []
}

onMounted(async () => {
  await loadAllData()
})

watch(currentYear, async () => {
  resetLoadedStates()
  await loadAllData()
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