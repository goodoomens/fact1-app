<script setup lang="ts">
import { useDriverStandingsStore } from '@/stores'
import { storeToRefs } from 'pinia'
import {
  driverCodePhoto,
  constructorIdTeamColor,
  constructorIdTeamLogo,
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
  <ProgressBar v-if="!isLoaded" mode="indeterminate"></ProgressBar>
  <div v-else class="flex flex-col w-full">
    <template
      v-for="standing in driverStandings"
      :key="standing.Driver.driverId"
    >
      <hr class="border-gray-200" />
      <div
        class="relative h-16 w-full cursor-pointer grid grid-cols-[auto_auto_8fr_1fr] items-center justify-items-start hover:brightness-90"
      >
        <!--          :class="constructorIdTeamColor[getLatestConstructorId(standing)]?.bg">-->
        <span
          class="w-14 text-lg font-semibold flex items-center justify-center"
        >
          {{ standing.position }}
        </span>
        <!--        <div class="w-3 h-full" :class="constructorIdTeamColor[getLatestConstructorId(standing)]?.bg"/>-->
        <!--        <div class="w-20 h-16 overflow-hidden">-->
        <!--        </div>-->
        <!--             :class="constructorIdTeamColor[getLatestConstructorId(standing)]?.text">-->
        <!--        <img class="w-8 mx-4"-->
        <!--             :src="constructorIdTeamLogo[getLatestConstructorId(standing)]"/>-->
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
        <!--          <span class="text font-black flex items-center leading-4">{{ standing.Driver.familyName }}-->
        <!--        </span>-->
        <div class="mr-4">
          <div
            class="w-16 rounded-lg py-05 text-lg font-mono flex gap-1 items-center justify-center bg-gray-200"
          >
            <span class="font-bold text-sm">{{ standing.points }}</span>
            <span class="text-xs">{{ $t('global.pts') }}</span>
          </div>
        </div>
      </div>
      <!--      <div-->
      <!--          class="cursor-pointer grid grid-cols-[auto_auto_auto_3fr_auto] gap-2 items-center justify-items-start hover:brightness-90"-->
      <!--          :class="constructorIdTeamColor[getLatestConstructorId(standing)]?.bg">-->
      <!--        <span-->
      <!--            class="w-12 h-full text-lg font-semibold flex items-center justify-center bg-black text-white">-->
      <!--          {{ standing.position }}-->
      <!--        </span>-->
      <!--        <img class="w-10"-->
      <!--             :src="constructorIdTeamLogo[getLatestConstructorId(standing)]"/>-->
      <!--        <div class="w-20 h-16 overflow-hidden">-->
      <!--          <img class="h-full w-full object-top object-cover outline scale-150"-->
      <!--               :src="driverCodePhoto[standing.Driver.driverId] || driverCodePhoto[standing.Driver.familyName.toLowerCase()]"/>-->
      <!--        </div>-->
      <!--        <div class="uppercase flex flex-col items-start justify-center"-->
      <!--             :class="constructorIdTeamColor[getLatestConstructorId(standing)]?.text">-->
      <!--          <span class="text-xs font-semibold">{{ standing.Driver.givenName }}</span>-->
      <!--          <span class="text font-black flex items-center leading-4">{{ standing.Driver.familyName }}-->
      <!--        </span>-->
      <!--        </div>-->
      <!--        <div-->
      <!--            class="w-14 h-full ml-auto text-lg font-mono flex items-center justify-center bg-red-700 text-white font-black">-->
      <!--          {{ standing.points }}-->
      <!--        </div>-->
      <!--      </div>-->
    </template>
  </div>
</template>
