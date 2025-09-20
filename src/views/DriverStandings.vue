<script setup lang="ts">
import { useDriverStandingsStore } from '@/stores'
import { storeToRefs } from 'pinia'
import {
  driverCodePhoto,
  constructorIdTeamColor,
  constructorIdTeamLogo
} from '@/mappings'
import { DriverStanding } from '@/types'

const { driverStandings, isLoaded } = storeToRefs(useDriverStandingsStore())

const getLatestConstructorId = (standing: DriverStanding) => {
  const length = standing.Constructors.length
  if (length > 1) {
    return standing.Constructors[length - 1]?.constructorId
  }
  return standing.Constructors[0]?.constructorId
}
</script>

<template>
  <ProgressBar v-if="!isLoaded" mode="indeterminate" data-ident="progress"></ProgressBar>
  <div v-else class="flex flex-col w-full">
    <template
      v-for="(standing, idx) in driverStandings"
      :key="standing.Driver.driverId"
    >
      <hr v-if="idx !== 0" class="border-neutral-200 dark:border-neutral-900" />
      <div
        class="relative h-16 w-full cursor grid grid-cols-[auto_auto_8fr_1fr] items-center justify-items-start hover:brightness-90 dark:bg-neutral-800"
      >
        <span
          class="w-14 text-lg font-semibold flex items-center justify-center"
        >
          {{ standing.position }}
        </span>
        <div class="p-1 h-16 aspect-square">
          <div
            class="overflow-hidden rounded-full"
            :class="
              constructorIdTeamColor[getLatestConstructorId(standing)]?.bg
            "
          >
            <img
              class="h-full w-full object-center object-contain"
              :src="driverCodePhoto[standing.Driver.code]"
            />
          </div>
        </div>
        <div class="flex flex-col ml-4">
          <span class="font-bold">{{
              standing.Driver.familyName.toUpperCase()
            }}</span>
          <div class="flex gap-2">
            <img
              class="h-4"
              :src="constructorIdTeamLogo[getLatestConstructorId(standing)]"
            />
            <span class="text-xs">{{ standing.Constructors[0].name }}</span>
          </div>
        </div>
        <div class="mr-4">
          <div
            class="w-16 rounded-lg py-05 text-lg font-mono flex gap-1 items-center justify-center bg-neutral-200 dark:bg-neutral-900"
          >
            <span class="font-bold text-sm">{{ standing.points }}</span>
            <span class="text-xs">{{ $t('global.pts') }}</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
