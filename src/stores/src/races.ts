import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useFetchData } from '@/composables'
import { RaceEvent } from '@/models'
import { useConfigStore } from '@/stores'

const STORE_KEY = 'races'

const isUpcomingRace = (race: RaceEvent) => {
  const { date, time } = race
  const now = new Date()
  const raceDateTime = new Date(`${date}T${time}`)
  return raceDateTime > now
}

export default defineStore(STORE_KEY, () => {
  const configStore = useConfigStore()
  const races = ref<RaceEvent[]>([])
  const isLoaded = ref(false)
  const error = ref<Error | null>(null)
  const { fetchData, fetchLoading } = useFetchData()

  const load = async (year?: number | string) => {
    const targetYear = year ?? configStore.currentYear
    if (targetYear !== configStore.currentYear) {
      configStore.setYear(Number(targetYear))
    }

    const loadedYear = races.value.length > 0 ? races.value[0].season : null

    if (isLoaded.value && String(loadedYear) === String(targetYear)) return

    fetchLoading.value = true
    try {
      races.value = await fetchData(STORE_KEY, { year: targetYear })
      isLoaded.value = true
    } catch (err: any) {
      error.value = err
      console.error(`[!] Error loading ${STORE_KEY}:`, err)
    } finally {
      fetchLoading.value = false
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
    currentYear: computed(() => configStore.currentYear),
    loadRaces: load,
    getRaceByCircuitId,
    getFinishedRounds
  }
})
