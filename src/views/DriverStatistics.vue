<script setup lang="ts">
import { computed } from 'vue'
import { ExcelService } from '@/services'
import { ContentToolbar } from '@/components'
import { useRouting } from '@/composables'
import { useResultsStore } from '@/stores'
import {
  constructorIdTeamColor,
  constructorIdTeamLogo,
  driverIdColor,
  driverIdPhoto
} from '@/mappings'
import type { DriverResult } from '@/models'

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

const onExportExcel = async () => {
  const driverNames = props.driverIds.reduce((acc, id) => {
    const name = results.value[id]?.[0]?.result.Driver.familyName || id
    acc[id] = name
    return acc
  }, {} as Record<string, string>)

  const races = results.value[props.driverIds[0]]?.map(r => r.country) ?? []

  const positionsByDriver = props.driverIds.reduce((acc, id) => {
    acc[id] = (results.value[id] ?? []).map(r => Number(r.result.position))
    return acc
  }, {} as Record<string, number[]>)

  const cumulativePointsByDriver = props.driverIds.reduce((acc, id) => {
    let sum = 0
    acc[id] = (results.value[id] ?? []).map(r => (sum += Number(r.result.points)))
    return acc
  }, {} as Record<string, number[]>)

  const driverOrder = props.driverIds
  const headers = ['Race', ...driverOrder.map((id) => driverNames[id] ?? id)]

  const rowsPositions = races.map((race, idx) => [
    race,
    ...driverOrder.map((id) => positionsByDriver[id]?.[idx] ?? null)
  ])

  const rowsPoints = races.map((race, idx) => [
    race,
    ...driverOrder.map((id) => cumulativePointsByDriver[id]?.[idx] ?? null)
  ])

  await ExcelService.exportFile({
    filename: 'driver-statistics.xlsx',
    sheets: [
      {
        name: 'Finishing Positions by Race',
        title: 'Finishing Positions by Race',
        tables: [
          { headers, rows: rowsPositions }
        ]
      },
      {
        name: 'Cumulative Points by Race',
        title: 'Cumulative Points by Race',
        tables: [
          { headers, rows: rowsPoints }
        ]
      }
    ]
  })
}

const chartOptionsPoints = computed(() => {
  const driverEntries = Object.entries(results.value)

  const series = driverEntries.map(([driverId, driverResults]) => {
    let sum = 0
    const data = driverResults.map(r => (sum += Number(r.result.points)))
    return {
      name: driverResults[0]?.result.Driver.familyName ?? driverId,
      data,
      marker: { symbol: 'circle' },
      color: driverIdColor[driverId || 'default']
    }
  })

  const categories = driverEntries[0]?.[1].map(r => r.country) ?? []

  return {
    chart: {
      type: 'line',
      height: '500px'
    },
    title: {
      text: 'Cumulative Points by Race',
      style: {
        color: '#737373',
        fontSize: '16px',
        fontWeight: 'regular'
      }
    },
    xAxis: {
      categories,
      title: null,
      labels: { rotation: -45 }
    },
    yAxis: {
      title: { text: 'Points' },
      min: 0,
      allowDecimals: false
    },
    tooltip: {
      shared: true,
      crosshairs: true,
      pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>'
    },
    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'bottom'
    },
    series
  }
})

const chartOptions = computed(() => {
  const driverEntries = Object.entries(results.value)

  const series = driverEntries.map(([driverId, driverResults]) => ({
    name: driverResults[0]?.result.Driver.familyName ?? driverId,
    data: driverResults.map(r => Number(r.result.position)),
    marker: { symbol: 'circle' },
    color: driverIdColor[driverId || 'default']
  }))

  const categories =
    driverEntries[0]?.[1].map(r => r.country) ?? []

  return {
    chart: {
      type: 'line',
      height: '500px'
    },
    title: {
      text: 'Finishing Positions by Race',
      style: {
        color: '#737373',
        fontSize: '16px',
        fontWeight: 'regular'
      }
    },
    xAxis: {
      categories,
      title: null,
      labels: { rotation: -45 }
    },
    yAxis: {
      title: null,
      reversed: true,
      min: 1,
      max: 20,
      tickInterval: 1
    },
    tooltip: {
      shared: true,
      crosshairs: true,
      formatter() {
        const sortedPoints = this.points.sort((a, b) => a.y - b.y)
        return sortedPoints
          .map(p => `<span style="color:${p.color}">${p.series.name}</span>: <b>${p.y}</b><br/>`)
          .join('')
      }
    },
    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'bottom'
    },
    series
  }
})
</script>

<template>
  <ContentToolbar>
    <template #toolbar>
      <div class="w-full flex items-center justify-between">
        <Button
          size="small"
          variant="text"
          :label="$t('actions.backToDriverStandings')"
          icon="pi pi-chart-line"
          @click="() => goTo('driverStandings')"
        />
        <Button
          size="small"
          :label="$t('actions.exportToExcel')"
          icon="pi pi-file-excel"
          @click="onExportExcel"
        />
      </div>
    </template>

    <template #content>
      <div class="p-6 flex flex-col gap-8">
        <h2 class="text-4xl font-semibold">Positions</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <template v-for="driver in drivers" :key="driver.id">
            <!-- Driver Card -->
            <div
              class="py-2 sm:py-6 flex flex-col gap-4 items-center dark:bg-neutral-800 rounded-lg outline-2 outline-neutral-200"
            >
              <div class="flex items-center gap-2">
                <!-- Photo -->
                <div class="p-1 h-16 aspect-square">
                  <div
                    class="overflow-hidden rounded-full"
                    :class="constructorIdTeamColor[driver.constructorId]?.bg"
                  >
                    <img
                      class="h-full w-full object-center object-contain"
                      :src="driverIdPhoto[driver.id]"
                    />
                  </div>
                </div>
                <!-- Text -->
                <div class="flex flex-col">
                  <span class="font-bold text-xl">{{ driver.code }}</span>
                  <div class="flex gap-2">
                    <img
                      class="h-4"
                      :src="constructorIdTeamLogo[driver.constructorId]"
                    />
                    <span class="text-xs">{{ driver.constructorName }}</span>
                  </div>
                </div>
              </div>
              <!-- Positions -->
              <div class="grid grid-cols-2 items-center w-full px-4 sm:px-10">
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
        <highcharts :options="chartOptions"></highcharts>
        <h2 class="text-4xl font-semibold">Points</h2>
        <highcharts :options="chartOptionsPoints"></highcharts>
      </div>
    </template>
  </ContentToolbar>
</template>
