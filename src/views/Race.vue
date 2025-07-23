<script setup lang="ts">
import { computed } from 'vue'
import { pickBy } from 'lodash'
import useApp from '@/composables/useRouting'
import useTime from '@/composables/useTime'
import { useRacesStore } from '@/stores'
import { useI18n } from 'vue-i18n'
import {
  circuitIdFlag,
  circuitIdImage,
  circuitIdTrack,
  circuitIdTrackDetails,
  degradationColorClasses,
  scheduleColorClasses,
} from '@/mappings'
import { ImgIcon, ObjectTable } from '@/components'
import { Degradation } from '@/models'
import tire_icon from '@/assets/icons/tire.png'
import brake_icon from '@/assets/icons/brake.png'

const { locale } = useI18n()
const { format: formatTime } = useTime(locale.value as 'de' | 'en')
const { getRaceByCircuitId, nextRace, loadRaces } = useRacesStore()

// Ensure races are loaded
loadRaces()

const { getParameter, goTo } = useApp()
const circuitId = getParameter('circuitId')
const race = circuitId ? getRaceByCircuitId(circuitId) : nextRace
const actualCircuitId = race?.Circuit?.circuitId || 'default'
const image = computed(
  () => circuitIdImage[actualCircuitId] || circuitIdImage['default']
)
const details = computed(
  () =>
    circuitIdTrackDetails[actualCircuitId] || circuitIdTrackDetails['default']
)

const detailsDisplay = computed((): Record<string, string> => {
  if (!race) return {}
  const { length, laps } = details.value
  return {
    circuitName: race.Circuit.circuitName,
    laps: laps.toString(),
    length: `${(length / 1000).toFixed(2)} km`,
    distance: `${((length * laps) / 1000).toFixed(2)} km`,
    brakeDeg: details.value.brakeDeg,
    tireDeg: details.value.tireDeg,
  }
})

const schedulDisplay = computed((): Record<string, string> => {
  if (!race) return {}

  const {
    FirstPractice: fp1,
    SprintQualifying: sq,
    SecondPractice: fp2,
    ThirdPractice: fp3,
    Sprint: s,
    Qualifying: q,
  } = race

  const formatOptions = { long: true, weekdayShort: true }

  return pickBy({
    firstPractice: fp1 && formatTime(fp1.date, fp1.time, formatOptions),
    sprintQualifying: sq && formatTime(sq.date, sq.time, formatOptions),
    secondPractice: fp2 && formatTime(fp2.date, fp2.time, formatOptions),
    thirdPractice: fp3 && formatTime(fp3.date, fp3.time, formatOptions),
    sprintRace: s && formatTime(s.date, s.time, formatOptions),
    qualifying: q && formatTime(q.date, q.time, formatOptions),
    race: formatTime(race.date, race.time, formatOptions),
  }) as Record<string, string>
})

const getBgClass = (degradation: Degradation) =>
  degradationColorClasses[degradation]

const detailIconMap = {
  tireDeg: tire_icon,
  brakeDeg: brake_icon,
}
</script>

<template>
  <div v-if="!race" class="flex items-center justify-center h-64">
    <span class="text-gray-500">Race not found</span>
  </div>
  <div v-else class="bg-gray-100 w-full h-full flex flex-col items-start">
    <Button
      class="m-2"
      size="small"
      variant="text"
      label="Back to calendar"
      icon="pi pi-chevron-left"
      @click="goTo('calendar')"
    />
    <div class="bg-white grid grid-cols-1 w-full">
      <div
        class="h-48 sm:h-64 md:h-88 bg-center bg-cover flex flex-col gap-4 items-start justify-end p-6"
        :style="{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.0)), url(${image})`,
        }"
      >
        <ImgIcon
          class="shadow-lg"
          :id="race.Circuit.circuitId"
          :id-image-map="circuitIdFlag"
          rounded="circle"
        />
        <div class="flex flex-col gap-1">
          <span
            class="text-2xl font-bold text-white leading-6 text-shadow-lg"
            >{{ race.raceName }}</span
          >
          <span class="text-xs uppercase text-white text-shadow-lg">
            {{ race.Circuit.Location.country }} &bull;
            {{ race.Circuit.Location.locality }}
          </span>
        </div>
        <span
          class="bg-[rgba(0,0,0,0.6)] text-white text-xs px-2 py-1 rounded text-shadow-lg"
          >{{
            formatTime(race.date, race.time, { long: true, dateOnly: true })
          }}</span
        >
      </div>

      <div class="grid sm:grid-cols-2 gap-4 p-4">
        <ObjectTable
          :title="$t('global.trackDetails')"
          :items="detailsDisplay"
          columns="2/3"
        >
          <template #key="{ props: { key } }">
            <span>{{ $t(`details.${key}`) }}</span>
          </template>
          <template #value="{ props: { key, value } }">
            <Tag
              v-if="value in Degradation"
              :class="[getBgClass(value as Degradation)]"
            >
              <img class="h-3" :src="detailIconMap[key]" />
              {{ $t(`degradation.${value}`) }}
            </Tag>
            <span class="text-right" v-else>{{ value }}</span>
          </template>
        </ObjectTable>

        <div
          v-if="circuitIdTrack[circuitId]"
          class="p-4 flex items-center justify-center"
        >
          <img class="w-2/3 sm:w-full" :src="circuitIdTrack[circuitId]" />
        </div>

        <ObjectTable
          :title="$t('global.schedule')"
          :items="schedulDisplay"
          columns="2/3"
        >
          <template #key="{ props: { key } }">
            <div class="flex items-center gap-2">
              <div
                class="h-2 aspect-square rounded-full"
                :class="scheduleColorClasses[key].bg"
              />
              <span class="text-xs">{{ $t(`schedule.${key}`) }}</span>
            </div>
          </template>
          <template #value="{ props: { value } }">
            <span class="text-xs tracking-tight font-mono">{{ value }}</span>
          </template>
        </ObjectTable>
      </div>
    </div>
  </div>
</template>
