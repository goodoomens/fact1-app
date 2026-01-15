import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useFetchData } from '@/composables'
import { TeamStanding } from '@/models'
import { useConfigStore } from '@/stores'

const STORE_KEY = 'teamStandings'

export default defineStore(STORE_KEY, () => {
  const configStore = useConfigStore()
  const teamStandings = ref<TeamStanding[]>([])
  const isLoaded = ref(false)
  const error = ref<Error | null>(null)
  const { fetchData, fetchLoading } = useFetchData()

  const load = async () => {
    if (isLoaded.value || fetchLoading.value) return
    try {
      teamStandings.value = await fetchData(STORE_KEY, { year: configStore.currentYear })
      isLoaded.value = true
    } catch (err: any) {
      error.value = err
      console.error(`[!] Error loading ${STORE_KEY}:`, err)
    }
  }

  return {
    teamStandings,
    isLoaded,
    fetchLoading,
    error,
    loadTeamStandings: load
  }
})
