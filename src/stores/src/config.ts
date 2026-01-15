import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const STORE_KEY = 'config'

export default defineStore(STORE_KEY, () => {
  const maxYear = new Date().getFullYear()
  const minYear = maxYear - 4
  const currentYear = ref<number>(maxYear)

  const setYear = (year: number) => {
    if (year >= minYear && year <= maxYear) {
      currentYear.value = year
    }
  }

  const canGoNext = computed(() => currentYear.value < maxYear)
  const canGoPrev = computed(() => currentYear.value > minYear)

  return {
    currentYear,
    minYear,
    maxYear,
    setYear,
    canGoNext,
    canGoPrev
  }
})
