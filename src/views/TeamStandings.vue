<script setup lang="ts">
import { useTeamStandingsStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { constructorIdTeamColor, constructorIdTeamLogo } from '@/mappings'

const { teamStandings, isLoaded } = storeToRefs(useTeamStandingsStore())
</script>

<template>
  <ProgressBar v-if="!isLoaded" mode="indeterminate"></ProgressBar>
  <div v-else class="flex flex-col w-full">
    <template v-for="standing in teamStandings" :key="`${standing.Constructor.constructorId}-${standing.position}`">
      <hr class="border-white"/>
      <div
          class="h-16 cursor-pointer grid grid-cols-[auto_auto_3fr_auto] gap-x-4 items-center justify-items-start hover:brightness-90"
          :class="constructorIdTeamColor[standing.Constructor.constructorId].bg">
          <span
              class="w-12 h-full text-lg font-semibold flex items-center justify-center bg-black text-white">
            {{ standing.position }}
          </span>
        <img class="w-12 h-12"
             :src="constructorIdTeamLogo[standing.Constructor.constructorId]"/>
        <div class="uppercase"
             :class="constructorIdTeamColor[standing.Constructor.constructorId].text">
          <span class="text font-black flex items-center leading-4">{{ standing.Constructor.name }}</span>
        </div>
        <div
            class="h-full w-14 ml-auto text-lg font-mono flex items-center justify-center bg-red-700 text-white font-black">
          {{ standing.points }}
        </div>
      </div>
    </template>
  </div>
</template>
