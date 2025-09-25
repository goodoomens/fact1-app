import { Degradation } from '../enums/scales.ts'

export type TrackDetails = {
  length: number
  laps: number
  tireDeg: Degradation
  brakeDeg: Degradation
}