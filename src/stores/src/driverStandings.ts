import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useFetchData } from '@/composables'
import { DriverStanding } from '@/models'

const STORE_KEY = 'driverStandings'

export default defineStore(STORE_KEY, () => {
  const driverStandings = ref<DriverStanding[]>([])
  const isLoaded = ref(false)
  const error = ref<Error | null>(null)
  const { fetchData, fetchLoading } = useFetchData()

  const load = async () => {
    if (isLoaded.value || fetchLoading.value) return
    try {
      driverStandings.value = await fetchData(STORE_KEY)
      isLoaded.value = true
    } catch (err: any) {
      error.value = err
      console.error(`[!] Error loading ${STORE_KEY}:`, err)
    }
  }

  const getLatestConstructorId = (standing: DriverStanding) => {
    const length = standing.Constructors.length
    if (length > 1) {
      return standing.Constructors[length - 1]?.constructorId
    }
    return standing.Constructors[0]?.constructorId
  }

  return {
    driverStandings,
    isLoaded,
    fetchLoading,
    error,
    loadDriverStandings: load,
    getLatestConstructorId
  }
})
