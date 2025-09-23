import { ref, watch, computed } from 'vue'
import type { Ref } from 'vue'

type Unit = 'km' | 'miles'

const unit = ref<Unit>('km')

export default (localeRef: Ref<string>) => {
  watch(localeRef, (locale) => {
    unit.value = locale === 'en' ? 'miles' : 'km'
  }, { immediate: true })

  const calculate = (distance: string | number) => {
    return computed(() => {
      const distanceNumber = typeof distance === 'string' ? parseFloat(distance) : distance
      const value = unit.value === 'km' ? distanceNumber : distanceNumber * 0.621371
      return `${value.toFixed(2)} ${unit.value}`
    })
  }

  return {
    unit,
    calculate
  }
}