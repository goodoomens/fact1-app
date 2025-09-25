import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useFetchData } from '@/composables'
import { delay } from '@/utils'
import type { Race, CalendarResult } from '@/models'

const STORE_KEY = 'results'

export const useResultsStore = defineStore(STORE_KEY, () => {
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
          const res = await fetchData(STORE_KEY, { round })
          if (res) results.value.push(res)
          await delay(300)
        }
      } else {
        const res = await fetchData(STORE_KEY)
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

  return {
    loadResults: load,
    results,
    calendarResults,
    getCalendarResultByCircuitId,
    isLoaded,
    fetchLoading,
    error
  }
})