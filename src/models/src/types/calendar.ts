import { Circuit } from './api.ts'

export type Event = {
  date: string
  time: string
}

export type RaceEvent = {
  season: string
  round: string
  url: string
  raceName: string
  Circuit: Circuit
  date: string
  time: string
  FirstPractice?: Event
  SecondPractice?: Event
  ThirdPractice?: Event
  Qualifying?: Event
  Sprint?: Event
  SprintQualifying?: Event
}