import { Result } from './api.ts'

export type DriverResult = {
  round: string,
  raceName: string
  circuitId: string
  country: string
  result: Result
}