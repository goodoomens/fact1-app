import { defineStore } from 'pinia'
import { ref } from 'vue'
import useFetchData from '@/composables/useFetchData'
import { TeamStanding } from '@/types'

export const useTeamStandingsStore = defineStore('teamStandings', () => {
  const teamStandings = ref<TeamStanding[]>([])
  const isLoaded = ref(false)
  const error = ref<Error | null>(null)
  const { fetchData, fetchLoading } = useFetchData()

  async function load() {
    if (isLoaded.value || fetchLoading.value) return
    try {
      teamStandings.value = await fetchData('teamStandings')
      isLoaded.value = true
    } catch (err: any) {
      error.value = err
      console.error('[!] Error loading teamStandings:', err)
    }
  }

  return {
    teamStandings,
    isLoaded,
    fetchLoading,
    error,
    loadTeamStandings: load,
  }
})
