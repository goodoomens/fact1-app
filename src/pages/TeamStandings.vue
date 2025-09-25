<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTeamStandingsStore } from '@/stores'
import { constructorIdTeamColor, constructorIdTeamLogo } from '@/mappings'

const { teamStandings, isLoaded } = storeToRefs(useTeamStandingsStore())
</script>

<template>
  <ProgressBar v-if="!isLoaded" mode="indeterminate" data-ident="progress"></ProgressBar>
  <div v-else class="flex flex-col w-full h-full">
    <template
      v-for="(standing, idx) in teamStandings"
      :key="`${standing.Constructor.constructorId}-${standing.position}`"
    >
      <hr v-if="idx !== 0" class="border-neutral-200 dark:border-neutral-900" />
      <div
        class="shrink-0 relative h-16 w-full grid grid-cols-[auto_auto_8fr_1fr] items-center justify-items-start hover:brightness-90 dark:bg-neutral-800"
      >
        <span
          class="w-14 text-lg font-semibold flex items-center justify-center"
        >
          {{ standing.position }}
        </span>

        <div class="flex items-center justify-center gap-5 h-full">
          <div
            class="w-2 h-2/3 py-2 rounded"
            :class="constructorIdTeamColor[standing.Constructor.constructorId].bg"
          />
          <img
            class="w-10 object-center object-contain"
            :src="constructorIdTeamLogo[standing.Constructor.constructorId]"
          />
        </div>
        <div class="flex flex-col ml-4">
          <span class="font-bold">{{ standing.Constructor.name }}</span>
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
