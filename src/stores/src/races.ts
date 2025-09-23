import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import useFetchData from '@/composables/src/useFetchData.ts'

import { Race } from '@/types/src/race'

const isUpcomingRace = (race: Race) => {
  const { date, time } = race
  const now = new Date()
  const raceDateTime = new Date(`${date}T${time}`)
  return (
    raceDateTime > now &&
    raceDateTime < new Date(raceDateTime.getTime() + 24 * 60 * 60 * 1000)
  )
}

export const useRacesStore = defineStore('races', () => {
  const races = ref<Race[]>([])
  const isLoaded = ref(false)
  const error = ref<Error | null>(null)
  const { fetchData, fetchLoading } = useFetchData()

  async function load() {
    if (isLoaded.value || fetchLoading.value) return
    try {
      races.value = await fetchData('calendar')
      isLoaded.value = true
    } catch (err: any) {
      error.value = err
      console.error('[!] Error loading races:', err)
    }
  }

  const getRaceByCircuitId = computed(
    () => (circuitId: string) =>
      races.value.find((race: Race) => race.Circuit.circuitId === circuitId)
  )

  return {
    nextRace: computed(() => races.value?.find(isUpcomingRace)),
    races,
    isLoaded,
    fetchLoading,
    error,
    loadRaces: load,
    getRaceByCircuitId
  }
})
