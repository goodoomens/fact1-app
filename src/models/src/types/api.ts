export type ApiResponse = {
  MRData: {
    xmlns: string
    series: string
    url: string
    limit: string
    offset: string
    total: string
    RaceTable: {
      season: string
      round: string
      Races: Race[]
    }
  }
}

export type Race = {
  season: string
  round: string
  url: string
  raceName: string
  Circuit: Circuit
  date: string
  time: string
  Results: Result[]
}

export type Circuit = {
  circuitId: string
  url: string
  circuitName: string
  Location: Location
}

export type Location = {
  lat: string
  long: string
  locality: string
  country: string
}

export type Result = {
  number: string
  position: string
  positionText: string
  points: string
  Driver: Driver
  Constructor: Constructor
  grid: string
  laps: string
  status: string
  Time?: Time
  FastestLap?: FastestLap
}

export type Driver = {
  driverId: string
  permanentNumber: string
  code: string
  url: string
  givenName: string
  familyName: string
  dateOfBirth: string
  nationality: string
}

export type Constructor = {
  constructorId: string
  url: string
  name: string
  nationality: string
}

export type Time = {
  millis?: string
  time: string
}

export type FastestLap = {
  rank: string
  lap: string
  Time: {
    time: string
  }
}

export type DriverStanding = {
  position: string
  positionText: string
  points: string
  wins: string
  Driver: Driver
  Constructors: Constructor[]
}

export type TeamStanding = {
  position: string
  positionText: string
  points: string
  wins: string
  Constructor: Constructor
}