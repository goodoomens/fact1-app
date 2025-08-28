export type Event = {
  date: string
  time: string
}

export type Race = {
  season: string
  round: string
  url: string
  raceName: string
  Circuit: {
    circuitId: string
    url: string
    circuitName: string
    Location: {
      lat: string
      long: string
      locality: string
      country: string
    }
  }
  date: string
  time: string
  FirstPractice?: Event
  SecondPractice?: Event
  ThirdPractice?: Event
  Qualifying?: Event
  Sprint?: Event
  SprintQualifying?: Event
}

export {}