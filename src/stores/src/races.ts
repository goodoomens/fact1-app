import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useFetchData } from '@/composables'
import { RaceEvent } from '@/models'

const STORE_KEY = 'races'

const isUpcomingRace = (race: RaceEvent) => {
  const { date, time } = race
  const now = new Date()
  const raceDateTime = new Date(`${date}T${time}`)
  return (
    raceDateTime > now &&
    raceDateTime < new Date(raceDateTime.getTime() + 24 * 60 * 60 * 1000)
  )
}

export default defineStore(STORE_KEY, () => {
  const races = ref<RaceEvent[]>([])
  const isLoaded = ref(false)
  const error = ref<Error | null>(null)
  const { fetchData, fetchLoading } = useFetchData()

  const load = async () => {
    if (isLoaded.value || fetchLoading.value) return
    try {
      races.value = await fetchData(STORE_KEY)
      isLoaded.value = true
    } catch (err: any) {
      error.value = err
      console.error(`[!] Error loading ${STORE_KEY}:`, err)
    }
  }

  const getRaceByCircuitId = computed(
    () => (circuitId: string) =>
      races.value.find((race: RaceEvent) => race.Circuit.circuitId === circuitId)
  )

  const getFinishedRaces = computed(() => races.value.filter(race => !isUpcomingRace(race)))
  const getFinishedRounds = computed(() =>
    [...Array(getFinishedRaces.value.length).keys()].map(i => i + 1)
  )

  return {
    nextRace: computed(() => races.value?.find(isUpcomingRace)),
    races,
    isLoaded,
    fetchLoading,
    error,
    loadRaces: load,
    getRaceByCircuitId,
    getFinishedRounds
  }
})
