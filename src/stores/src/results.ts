import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useFetchData } from '@/composables'
import type { Race, CalendarResult, DriverResult } from '@/models'
import { useConfigStore } from '@/stores'

const STORE_KEY = 'results'

export const useResultsStore = defineStore(STORE_KEY, () => {
  const configStore = useConfigStore()
  const results = ref<Race[]>([])
  const calendarResults = ref<CalendarResult[]>([])
  const isLoaded = ref(false)
  const error = ref<Error | null>(null)
  const { fetchData, fetchLoading } = useFetchData()

  const load = async (rounds?: number[]) => {
    if (isLoaded.value) return

    try {
      if (rounds && rounds.length > 0) {
        for (const round of rounds) {
          const res = await fetchData(STORE_KEY, { round, year: configStore.currentYear })
          if (res) results.value.push(res)
        }
      } else {
        const res = await fetchData(STORE_KEY, { year: configStore.currentYear })
        if (res) results.value.push(res)
      }

      calendarResults.value = resultsToCalendarResults(results.value)
      isLoaded.value = true
    } catch (err: any) {
      error.value = err
      console.error(`[!] Error loading ${STORE_KEY}:`, err)
    }
  }

  const resultsToCalendarResults = (races: Race[]): CalendarResult[] => {
    return races.map(race => {
      const circuitId = race.Circuit.circuitId
      const results = race.Results.slice(0, 3)
      return { circuitId, results }
    })
  }

  const getCalendarResultByCircuitId = (circuitId: string) => {
    return calendarResults.value.find(race => race.circuitId === circuitId)
  }

  const getResultsByDriverId = (driverId: string): DriverResult[] => {
    return results.value.flatMap(race => {
      const result = race.Results.find(r => r.Driver.driverId === driverId)
      if (!result) return []
      return [{
        round: race.round,
        raceName: race.raceName,
        circuitId: race.Circuit.circuitId,
        country: race.Circuit.Location.country,
        result
      }]
    })
  }

  const getPositionStatsByDriverId = (driverId: string) => {
    const driverResults = getResultsByDriverId(driverId)
    if (!driverResults.length) return { best: null, avg: null, worst: null }

    const positions = driverResults.map(r => parseInt(r.result.position))
    const sum = positions.reduce((acc, pos) => acc + pos, 0)

    return {
      best: Math.min(...positions),
      avg: sum / positions.length,
      worst: Math.max(...positions)
    }
  }

  return {
    loadResults: load,
    results,
    calendarResults,
    getCalendarResultByCircuitId,
    getResultsByDriverId,
    getPositionStatsByDriverId,
    isLoaded,
    fetchLoading,
    error
  }
})