import { computed, ComputedRef } from 'vue'
import { driverIdColor } from '@/mappings'
import { CHART_CONFIG } from '@/config'
import type { DriverResult } from '@/models'

export default (results: ComputedRef<Record<string, DriverResult[]>>) => computed(() => {
  const driverEntries = Object.entries(results.value)

  const series = driverEntries.map(([driverId, driverResults]) => {
    const driverName = driverResults[0]?.result.Driver.familyName ?? driverId
    const finishingPositions = driverResults.map(r => Number(r.result.position))
    return {
      name: driverName,
      data: finishingPositions,
      marker: { symbol: 'circle' },
      color: driverIdColor[driverId || 'default']
    }
  })

  const categories = driverEntries[0]?.[1].map(result => result.country) ?? []

  return {
    ...CHART_CONFIG.BASE_LINE_CHART,
    title: {
      text: 'Finishing Positions by Race',
      style: CHART_CONFIG.DEFAULT_TITLE_STYLE
    },
    xAxis: {
      ...CHART_CONFIG.BASE_X_AXIS,
      categories
    },
    yAxis: {
      title: null,
      reversed: true,
      min: 1,
      max: 20,
      tickInterval: 1
    },
    tooltip: {
      ...CHART_CONFIG.TOOLTIP_SHARED_CROSSHAIRS,
      formatter() {
        const country = this.category
        const sortedPoints = this.points.sort((a, b) => a.y - b.y)
        return `<b>${country}</b><br/>` +
          sortedPoints
            .map(p => `<span style="color:${p.color}">${p.series.name}</span>: <b>${p.y}</b><br/>`)
            .join('')
      }
    },
    legend: CHART_CONFIG.BASE_LEGEND,
    series
  }
})