import { computed, ComputedRef } from 'vue'
import { driverIdColor } from '@/mappings'
import { CHART_CONFIG } from '@/config'
import type { DriverResult } from '@/models'

export default (results: ComputedRef<Record<string, DriverResult[]>>) => computed(() => {
  const driverEntries = Object.entries(results.value)

  const series = driverEntries.map(([driverId, driverResults]) => {
    const data = driverResults.reduce((acc, r) => {
      const next = (acc[acc.length - 1] ?? 0) + Number(r.result.points)
      acc.push(next)
      return acc
    }, [] as number[])
    return {
      name: driverResults[0]?.result.Driver.familyName ?? driverId,
      data,
      marker: { symbol: 'circle' },
      color: driverIdColor[driverId || 'default']
    }
  })

  const categories = driverEntries[0]?.[1].map(r => r.country) ?? []

  return {
    ...CHART_CONFIG.BASE_LINE_CHART,
    title: {
      text: 'Cumulative Points by Race',
      style: CHART_CONFIG.DEFAULT_TITLE_STYLE
    },
    xAxis: {
      ...CHART_CONFIG.BASE_X_AXIS,
      categories
    },
    yAxis: {
      title: null,
      min: 0,
      allowDecimals: false
    },
    tooltip: {
      ...CHART_CONFIG.TOOLTIP_SHARED_CROSSHAIRS,
      formatter() {
        const country = this.category
        const sortedPoints = this.points.sort((a, b) => b.y - a.y)
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