import type { ComputedRef } from 'vue'
import { ExcelService } from '@/services'
import type { DriverResult } from '@/models'

export default async (driverIds: string[], results: ComputedRef<Record<string, DriverResult[]>>) => {
  const driverNames = driverIds.reduce((acc, id) => {
    const name = results.value[id]?.[0]?.result.Driver.familyName || id
    acc[id] = name
    return acc
  }, {} as Record<string, string>)

  const races = results.value[driverIds[0]]?.map(r => r.country) ?? []

  const positionsByDriver = driverIds.reduce((acc, id) => {
    acc[id] = (results.value[id] ?? []).map(r => Number(r.result.position))
    return acc
  }, {} as Record<string, number[]>)

  const cumulativePointsByDriver = driverIds.reduce((acc, id) => {
    const points = (results.value[id] ?? []).map(r => Number(r.result.points))
    const cumulative = points.reduce((arr, p) => {
      arr.push((arr[arr.length - 1] ?? 0) + p)
      return arr
    }, [] as number[])
    acc[id] = cumulative
    return acc
  }, {} as Record<string, number[]>)

  const driverOrder = driverIds
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