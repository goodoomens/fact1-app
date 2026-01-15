import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useFetchData } from '@/composables'
import { DriverStanding } from '@/models'
import { useConfigStore } from '@/stores'

const STORE_KEY = 'driverStandings'

export default defineStore(STORE_KEY, () => {
  const configStore = useConfigStore()
  const driverStandings = ref<DriverStanding[]>([])
  const isLoaded = ref(false)
  const error = ref<Error | null>(null)
  const { fetchData, fetchLoading } = useFetchData()

  const load = async () => {
    const targetYear = configStore.currentYear
    // Wir prüfen, ob die bereits geladenen Daten zum aktuellen Jahr passen
    // Falls wir keine Daten haben oder das Jahr nicht übereinstimmt, laden wir neu.
    // In der Ergast API haben DriverStandings leider nicht direkt ein season Feld in den Items,
    // aber wir können isLoaded zurücksetzen, wenn sich das Jahr im Store ändert.
    
    if (isLoaded.value) return
    
    try {
      driverStandings.value = await fetchData(STORE_KEY, { year: targetYear })
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
