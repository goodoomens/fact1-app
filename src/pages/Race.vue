<script setup lang="ts">
import { computed } from 'vue'
import { pickBy } from 'lodash'
import { useRouting, useTime, useUnits } from '@/composables'
import { ContentToolbar, RoundImage } from '@/components'
import { useRacesStore, useResultsStore } from '@/stores'
import { useI18n } from 'vue-i18n'
import {
  circuitIdFlag,
  circuitIdImage,
  circuitIdTrack,
  circuitIdTrackDetails,
  degradationColorClasses,
  scheduleColorClasses,
  constructorIdTeamColor,
  driverCodePhoto
} from '@/mappings'
import { ImgIcon, ObjectTable } from '@/components'
import { Degradation } from '@/models'
import tire_icon from '@/assets/icons/tire.png'
import brake_icon from '@/assets/icons/brake.png'

const { locale } = useI18n()
const { getRaceByCircuitId, nextRace } = useRacesStore()
const { getCalendarResultByCircuitId } = useResultsStore()

const { calculate } = useUnits(locale)

const { getParameter, goTo } = useRouting()
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

const formatTime = computed(() => {
  const { format } = useTime(locale.value as 'de' | 'en' | 'nl')
  return format
})

const detailsDisplay = computed((): Record<string, string> => {
  if (!race) return {}
  const { length, laps } = details.value
  return {
    circuitName: race.Circuit.circuitName,
    laps: laps.toString(),
    length: `${(length / 1000).toFixed(2)} km`,
    distance: `${((length * laps) / 1000).toFixed(2)} km`,
    brakeDeg: details.value.brakeDeg,
    tireDeg: details.value.tireDeg
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
    Qualifying: q
  } = race

  const format = formatTime.value
  const formatOptions = { long: true, weekdayShort: true }

  return pickBy({
    firstPractice: fp1 && format(fp1.date, fp1.time, formatOptions),
    sprintQualifying: sq && format(sq.date, sq.time, formatOptions),
    secondPractice: fp2 && format(fp2.date, fp2.time, formatOptions),
    thirdPractice: fp3 && format(fp3.date, fp3.time, formatOptions),
    sprintRace: s && format(s.date, s.time, formatOptions),
    qualifying: q && format(q.date, q.time, formatOptions),
    race: format(race.date, race.time, formatOptions)
  }) as Record<string, string>
})

const getBgClass = (degradation: Degradation) =>
  degradationColorClasses[degradation]

const detailIconMap = {
  tireDeg: tire_icon,
  brakeDeg: brake_icon
}

const isNumber = (value: string) => !isNaN(parseFloat(value))

const result = computed(() => getCalendarResultByCircuitId(circuitId))

const twOrderOutlinePosition = {
  1: 'bg-yellow-50 dark:bg-yellow-900 border-yellow-400 order-1 sm:order-2',
  2: 'bg-gray-50 dark:bg-gray-900 border-gray-400 order-2 sm:order-1',
  3: 'bg-orange-50 dark:bg-orange-900 border-orange-600 order-3'
}
</script>

<template>
  <div v-if="!race" class="flex items-center justify-center h-64">
    <span class="text-neutral-500">Race not found</span>
  </div>
  <ContentToolbar v-else>
    <template #toolbar>
      <Button size="small"
              variant="text"
              :label="$t('actions.backToCalendar')"
              icon="pi pi-chevron-left"
              @click="goTo('calendar')" />
    </template>
    <template #content>
      <div class="w-full shrink-0 h-48 sm:h-64 bg-center bg-cover flex flex-col gap-4 items-start justify-end p-6"
           :style="{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.0)), url(${image})`,
        }">
        <ImgIcon class="shadow-lg"
                 :id="race.Circuit.circuitId"
                 :id-image-map="circuitIdFlag"
                 rounded="circle" />
        <div class="flex flex-col gap-1">
          <span class="text-2xl font-bold text-white leading-6 text-shadow-lg">
            {{ race.raceName }}
          </span>
          <span class="text-xs uppercase text-white text-shadow-lg">
            {{ race.Circuit.Location.country }} &bull;
            {{ race.Circuit.Location.locality }}
          </span>
        </div>
        <span class="text-white text-xs text-shadow-lg">
          {{ formatTime(race.date, race.time, { long: true, dateOnly: true }) }}
        </span>
      </div>

      <!-- Results -->
      <div v-if="result" class="w-full p-4 grid sm:grid-cols-3 grid-cols-1 gap-5 col-span-2">
        <div v-for="result in result.results" :key="result.Driver.driverId"
             class="flex items-center justify-between px-4 py-2 rounded-lg border-2"
             :class="twOrderOutlinePosition[result.position]">
          <div class="flex flex-col items-start gap-1">
            <span class="text-xl font-semibold">P{{ result.position }}</span>
            <span class="text-xs uppercase">{{ result.Driver.familyName }}</span>
            <div class="flex items-center gap-1">
              <i class="text-xs pi pi-clock"></i>
              <span class="text-xs uppercase">{{ result.Time.time }}</span>
            </div>
          </div>
          <RoundImage :class-name="constructorIdTeamColor[result.Constructor.constructorId]?.bg"
                      :image="driverCodePhoto[result.Driver.code]" />
        </div>
      </div>

      <div class="grid sm:grid-cols-2 gap-4 p-4">
        <ObjectTable :title="$t('global.schedule')"
                     :items="schedulDisplay"
                     columns="2/3">
          <template #key="{ props: { key } }">
            <div class="flex items-center gap-2">
              <div class="h-2 aspect-square rounded-full"
                   :class="scheduleColorClasses[key].bg" />
              <span class="text-xs">{{ $t(`schedule.${key}`) }}</span>
            </div>
          </template>
          <template #value="{ props: { value } }">
            <span class="text-xs tracking-tight font-mono">{{ value }}</span>
          </template>
        </ObjectTable>

        <ObjectTable :title="$t('global.trackDetails')"
                     :items="detailsDisplay"
                     columns="2/3">
          <template #key="{ props: { key } }">
            <span>{{ $t(`details.${key}`) }}</span>
          </template>
          <template #value="{ props: { key, value } }">
            <Tag v-if="value in Degradation"
                 :class="[getBgClass(value as Degradation)]">
              <img class="h-3" :src="detailIconMap[key]" />
              {{ $t(`degradation.${value}`) }}
            </Tag>
            <span class="text-right" v-else>{{ isNumber(value) ? calculate(value) : value }}</span>
          </template>
        </ObjectTable>

        <div v-if="circuitIdTrack[circuitId]"
             class="p-4 flex items-center justify-center dark:invert">
          <img class="w-2/3 sm:w-full" :src="circuitIdTrack[circuitId]" />
        </div>
      </div>
    </template>
  </ContentToolbar>
</template>
