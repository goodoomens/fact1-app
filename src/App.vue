<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { routes } from '@/router'
import {
  useRacesStore,
  useDriverStandingsStore,
  useTeamStandingsStore
} from '@/stores'

import { Menu, MenuButton } from '@/components'
import Overlay from '@/views/Overlay.vue'

import fact1_logo from '@/assets/fact1_logo.svg'

const { loadRaces } = useRacesStore()
const { loadDriverStandings } = useDriverStandingsStore()
const { loadTeamStandings } = useTeamStandingsStore()
const menuIsOpen = ref(false)

onMounted(() => {
  loadRaces()
  loadDriverStandings()
  loadTeamStandings()
})
</script>

<template>
  <div class="bg-neutral-100 dark:bg-neutral-900 h-dvh flex flex-col relative">

    <Overlay />

    <div class="sticky top-0 z-20">
      <div
        class="bg-gradient-to-r from-red-500 to-red-800 shadow-md z-10 flex justify-center"
      >
        <div
          class="w-full max-w-3xl flex items-center justify-between px-5 py-3"
        >
          <MenuButton v-model="menuIsOpen" />
          <div class="flex flex-col items-end text-white gap-2">
            <!--<span class="text-2xl font-black leading-6">Fact1</span>-->
            <img class="h-6" alt="Fact1" :src="fact1_logo" />
            <span class="text-xs leading-2">{{ $t('global.season') }} 2025</span>
          </div>
        </div>
      </div>
      <Menu
        v-model="menuIsOpen"
        :routes="routes.filter((route) => route.name !== 'race')"
      />
    </div>
    <router-view
      class="bg-white dark:bg-neutral-800 shadow-lg mx-auto max-w-3xl overflow-y-scroll"
    />
  </div>
</template>
