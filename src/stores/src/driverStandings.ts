import { defineStore } from 'pinia'
import { ref } from 'vue'
import useFetchData from '@/composables/useFetchData'

export const useDriverStandingsStore = defineStore('driverStandings', () => {
    const driverStandings = ref([])
    const isLoaded = ref(false)
    const error = ref<Error | null>(null)
    const { fetchData, fetchLoading } = useFetchData()

    async function load() {
        if (isLoaded.value || fetchLoading.value) return
        try {
            driverStandings.value = await fetchData('driverStandings')
            isLoaded.value = true
        } catch (err: any) {
            error.value = err
            console.error('[!] Error loading driverStandings:', err)
        }
    }

    return {
        driverStandings,
        isLoaded,
        fetchLoading,
        error,
        loadDriverStandings: load
    }
})
