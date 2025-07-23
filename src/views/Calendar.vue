<script setup lang="ts">
import { ref, computed } from 'vue'
import useApp from '@/composables/useRouting'
import useTime from '@/composables/useTime'
import { useRacesStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { circuitIdFlag, scheduleColorClasses } from '@/mappings'
import { useI18n } from 'vue-i18n'
import { ImgIcon, RaceCalendarCard, RoundTag, SmallTag } from '@/components'
import chequered_flag_icon from '@/assets/icons/chequered-flag.svg'

import type { Race } from '@/types'

const { goTo } = useApp()
const { locale } = useI18n()

const { format: formatTime } = useTime(locale.value as 'de' | 'en')

const { races, isLoaded } = storeToRefs(useRacesStore())
const hidePastRaces = ref(false)

const nextRace = computed(() => races.value?.find(isUpcomingRace))
const isUpcomingRace = (race: Race) => {
  const { date, time } = race
  const now = new Date()
  const raceDateTime = new Date(`${date}T${time}`)
  return (
    raceDateTime > now &&
    raceDateTime < new Date(raceDateTime.getTime() + 24 * 60 * 60 * 1000)
  )
}
const isSprintRace = (race: Race) => !!race.Sprint
const raceIsToday = (race: Race) => {
  const now = new Date().toDateString()
  const raceDate = new Date(race.date).toDateString()
  return now === raceDate
}

const onRaceClick = (circuitId: string) => goTo('race', { circuitId })
</script>

<template>
  <ProgressBar v-if="!isLoaded" mode="indeterminate"></ProgressBar>
  <div v-else class="flex flex-col w-full">
    <div class="bg-white flex justify-end p-2">
      <Button
        size="small"
        variant="text"
        :label="`${hidePastRaces ? 'Show' : 'Hide'} past races`"
        :icon="`pi ${hidePastRaces ? 'pi-eye' : 'pi-eye-slash'}`"
        @click="hidePastRaces = !hidePastRaces"
      />
    </div>

    <template
      v-for="race in hidePastRaces ? races?.filter(isUpcomingRace) : races"
      :key="race.Circuit.circuitId"
    >
      <hr class="border-gray-200" />
      <RaceCalendarCard @click="onRaceClick(race.Circuit.circuitId)">
        <template #tag v-if="race === nextRace">
          <RoundTag :label="raceIsToday(race) ? 'today' : 'next'" />
        </template>
        <template #image>
          <ImgIcon
            :id="race.Circuit.circuitId"
            :id-image-map="circuitIdFlag"
            rounded="circle"
            size="lg"
          />
        </template>
        <template #subtitle
          >{{ race.Circuit.Location.country }} &bull;
          {{ race.Circuit.Location.locality }}</template
        >
        <template #title>{{ race.raceName }}</template>
        <template #date v-if="isUpcomingRace(race)"
          >{{
            formatTime(race.date, race.time, {
              dateOnly: true,
              monthLong: true,
            })
          }}
        </template>
        <template #badge>
          <SmallTag
            v-if="isUpcomingRace(race) && isSprintRace(race)"
            :label="$t('schedule.sprint')"
            :class="scheduleColorClasses['sprintRace'].text"
          />
        </template>
        <template #append>
          <img
            v-if="!isUpcomingRace(race)"
            class="w-6"
            :src="chequered_flag_icon"
          />
        </template>
      </RaceCalendarCard>
    </template>
  </div>
</template>
