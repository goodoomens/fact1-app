<script setup lang="ts">
import { computed } from 'vue'
import { Heading, ContentToolbar, RoundImage } from '@/components'
import { useRouting } from '@/composables'
import { useResultsStore } from '@/stores'
import {
  constructorIdTeamColor,
  constructorIdTeamLogo,
  driverIdPhoto
} from '@/mappings'
import type { DriverResult } from '@/models'
import {
  exportDriverStatistics,
  getChartOptionsPoints,
  getChartOptionsPositions
} from './utils'

const { getResultsByDriverId, getPositionStatsByDriverId } = useResultsStore()
const { goTo } = useRouting()

const props = defineProps<{
  driverIds: string[]
}>()

const results = computed(() =>
  props.driverIds.reduce((acc, id) => {
    acc[id] = getResultsByDriverId(id)
    return acc
  }, {} as Record<string, DriverResult[]>)
)

const drivers = computed(() => props.driverIds.map(id => {
  const result = results.value[id]?.[0]
  return {
    id,
    code: result?.result.Driver.code,
    name: result?.result.Driver.familyName,
    constructorId: result?.result.Constructor.constructorId,
    constructorName: result?.result.Constructor.name,
    country: result?.country
  }
}))

const chartOptionsPoints = getChartOptionsPoints(results)
const chartOptionsPositions = getChartOptionsPositions(results)
const onExport = () => exportDriverStatistics(props.driverIds, results)
</script>

<template>
  <ContentToolbar>
    <template #toolbar>
      <div class="w-full flex items-center justify-between">
        <Button
          size="small"
          variant="text"
          :label="$t('actions.backToDriverStandings')"
          icon="pi pi-chevron-left"
          @click="() => goTo('driverStandings')"
        />
        <Button
          size="small"
          :label="$t('actions.exportToExcel')"
          icon="pi pi-file-excel"
          @click="onExport"
        />
      </div>
    </template>

    <template #content>
      <div class="p-6 flex flex-col gap-8">
        <!-- Section: Positions -->
        <Heading :label="$t('global.positions')" />
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <template v-for="driver in drivers" :key="driver.id">
            <!-- Driver Card -->
            <div
              class="py-2 sm:py-6 flex flex-col gap-4 items-center dark:bg-neutral-800 rounded-lg outline-2 outline-neutral-200"
            >
              <div class="flex items-center gap-2">
                <RoundImage v-if="driverIdPhoto[driver.id]"
                            :class-name="constructorIdTeamColor[driver.constructorId]?.bg"
                            :image="driverIdPhoto[driver.id]" />
                <div class="flex flex-col">
                  <span class="font-bold text-xl">{{ driver.code }}</span>
                  <div class="flex gap-2">
                    <img class="h-4"
                         :src="constructorIdTeamLogo[driver.constructorId]" />
                    <span class="text-xs">{{ driver.constructorName }}</span>
                  </div>
                </div>
              </div>
              <!-- Positions -->
              <div class="grid grid-cols-2 items-center w-full px-4 sm:px-10 mt-auto">
                <span class="text-xl font-extralight">{{ $t('global.high') }}</span>
                <span class="text-2xl font-bold text-right">{{ getPositionStatsByDriverId(driver.id)?.best }}</span>
                <span class="text-xl font-extralight">{{ $t('global.avg') }}</span>
                <span class="text-2xl font-bold text-right">{{ getPositionStatsByDriverId(driver.id)?.avg?.toFixed(2)
                  }}</span>
                <span class="text-xl font-extralight">{{ $t('global.low') }}</span>
                <span class="text-2xl font-bold text-right">{{ getPositionStatsByDriverId(driver.id)?.worst }}</span>
              </div>
            </div>
          </template>
        </div>

        <highcharts :options="chartOptionsPositions" />

        <!-- Section: Points -->
        <Heading :label="$t('global.points')" />
        <highcharts :options="chartOptionsPoints" />
      </div>
    </template>
  </ContentToolbar>
</template>
