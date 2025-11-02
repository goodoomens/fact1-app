<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouting, useTime } from '@/composables'
import { useRacesStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { circuitIdFlag, scheduleColorClasses } from '@/mappings'
import { useI18n } from 'vue-i18n'
import { ImgIcon, RaceCalendarCard, RoundTag, SmallTag, ContentToolbar } from '@/components'
import chequered_flag_icon from '@/assets/icons/chequered-flag.svg'

import type { RaceEvent } from '@/models'

const { goTo } = useRouting()
const { locale } = useI18n()

const { format: formatTime } = useTime(locale)

const { races, isLoaded } = storeToRefs(useRacesStore())
const hidePastRaces = ref(JSON.parse(localStorage.getItem('hidePastRaces') ?? 'false'))
const toggleHidePastRaces = () => {
  hidePastRaces.value = !hidePastRaces.value
  localStorage.setItem('hidePastRaces', String(hidePastRaces.value))
}

const nextRace = computed(() => races.value?.find(isUpcomingRace))
const isUpcomingRace = (race: RaceEvent) => {
  const { date, time } = race
  const now = new Date()
  const raceDateTime = new Date(`${date}T${time}`)
  return (
    raceDateTime > now &&
    raceDateTime < new Date(raceDateTime.getTime() + 24 * 60 * 60 * 1000)
  )
}
const isSprintRace = (race: RaceEvent) => !!race.Sprint
const raceIsToday = (race: RaceEvent) => {
  const now = new Date().toDateString()
  const raceDate = new Date(race.date).toDateString()
  return now === raceDate
}

const onRaceClick = (circuitId: string) => goTo('race', { circuitId })
</script>

<template>
  <ProgressBar v-if="!isLoaded" mode="indeterminate"></ProgressBar>
  <ContentToolbar v-else>
    <template #toolbar>
      <Button
        class="ml-auto"
        size="small"
        variant="text"
        :label="hidePastRaces ? $t('actions.showPastRaces') : $t('actions.hidePastRaces')"
        :icon="`pi ${hidePastRaces ? 'pi-eye' : 'pi-eye-slash'}`"
        @click="toggleHidePastRaces"
      />
    </template>
    <template #content>
      <template
        v-for="(race, idx) in hidePastRaces ? races?.filter(isUpcomingRace) : races"
        :key="race.Circuit.circuitId"
      >
        <hr v-if="idx !== 0" class="border-neutral-200 dark:border-neutral-900" />
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
          <template #subtitle>
            {{ race.Circuit.Location.country }}
            &bull;
            {{ race.Circuit.Location.locality }}
          </template>
          <template #title>{{ race.raceName }}</template>
          <template #date v-if="isUpcomingRace(race)">
            {{
              formatTime(race.date, race.time, {
                dateOnly: true,
                monthLong: true
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
    </template>
  </ContentToolbar>
</template>
