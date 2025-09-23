import { Degradation } from './enums'

export type TrackDetails = {
  length: number
  laps: number
  tireDeg: Degradation
  brakeDeg: Degradation
}

export type NavigationItem = {
  routeName: string,
  labelKey: string,
  icon: string,
}

export type Locale = 'de' | 'en' | 'nl'
