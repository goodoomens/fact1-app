<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouting } from '@/composables'
import { ContentToolbar } from '@/components'
import { useDriverStandingsStore } from '@/stores'
import {
  driverCodePhoto,
  constructorIdTeamColor,
  constructorIdTeamLogo
} from '@/mappings'
import type { DriverStanding } from '@/models'

const { goTo } = useRouting()

const { getLatestConstructorId } = useDriverStandingsStore()
const { driverStandings, isLoaded } = storeToRefs(useDriverStandingsStore())

const driverIds = ref<DriverStanding[]>([])
const selectDriver = (driver: any) => {
  driverIds.value.push(driver.Driver.driverId)
}
const deselectDriver = (driver: any) => {
  driverIds.value = driverIds.value.filter((d: any) => d !== driver.Driver.driverId)
}
const toggleDriver = (driver: any) => {
  if (driverIsSelected(driver)) {
    deselectDriver(driver)
  } else {
    selectDriver(driver)
  }
}
const driverIsSelected = (driver: any) => {
  return driverIds.value.includes(driver.Driver.driverId)
}
</script>

<template>
  <ProgressBar v-if="!isLoaded" mode="indeterminate" data-ident="progress"></ProgressBar>
  <ContentToolbar v-else>
    <template #toolbar>
      <Button
        size="small"
        variant="text"
        :disabled="driverIds.length === 0"
        :label="`${$t('actions.showStatistics')} ${driverIds.length > 0 ? `(${driverIds.length})` : ''}`"
        icon="pi pi-chart-line"
        @click="() => goTo('driverStatistics', { driverIds })"
      />
    </template>

    <template #content>
      <template
        v-for="(standing, idx) in driverStandings"
        :key="standing.Driver.driverId"
      >
        <hr v-if="idx !== 0" class="border-neutral-200 dark:border-neutral-900" />
        <div
          class="relative h-16 w-full cursor-pointer grid grid-cols-[auto_auto_8fr_1fr] items-center justify-items-start hover:brightness-90 dark:bg-neutral-800"
          :class="driverIsSelected(standing) ? 'bg-neutral-200 dark:bg-neutral-900' : ''"
          @click="toggleDriver(standing)"
        >
        <span
          class="w-14 text-lg font-semibold flex items-center justify-center"
        >
          {{ standing.position }}
        </span>
          <div class="p-1 h-16 aspect-square">
            <div
              class="overflow-hidden rounded-full"
              :class="constructorIdTeamColor[getLatestConstructorId(standing)]?.bg"
            >
              <img
                class="h-full w-full object-center object-contain"
                :src="driverCodePhoto[standing.Driver.code]"
              />
            </div>
          </div>
          <div class="flex flex-col ml-4">
            <span class="font-bold">{{ standing.Driver.familyName.toUpperCase() }}</span>
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
    </template>
  </ContentToolbar>
</template>
