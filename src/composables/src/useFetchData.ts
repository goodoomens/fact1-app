import { ref } from 'vue'
import axios from 'axios'
import { get } from 'lodash'

type FetchKey = 'races' | 'driverStandings' | 'teamStandings' | 'results'

type ApiEntry = {
  url: string | ((round?: number) => string)
  path: string
}

const API_URLS: Record<FetchKey, ApiEntry> = {
  races: {
    url: 'https://api.jolpi.ca/ergast/f1/current/',
    path: 'MRData.RaceTable.Races'
  },
  driverStandings: {
    url: 'https://api.jolpi.ca/ergast/f1/current/driverstandings/',
    path: 'MRData.StandingsTable.StandingsLists[0].DriverStandings'
  },
  teamStandings: {
    url: 'https://api.jolpi.ca/ergast/f1/current/constructorstandings/',
    path: 'MRData.StandingsTable.StandingsLists[0].ConstructorStandings'
  },
  results: {
    url: (round?: number) =>
      round
        ? `https://api.jolpi.ca/ergast/f1/current/${round}/results/`
        : 'https://api.jolpi.ca/ergast/f1/current/results',
    path: 'MRData.RaceTable.Races[0]'
  }
}

export default () => {
  const fetchLoading = ref(false)

  const fetchData = async (key: FetchKey, options?: { round: number }) => {
    fetchLoading.value = true

    const url =
      typeof API_URLS[key].url === 'function'
        ? API_URLS[key].url(options?.round)
        : API_URLS[key].url

    try {
      const response = await axios.get(url)
      return get(response.data, API_URLS[key].path)
    } finally {
      fetchLoading.value = false
    }
  }

  return {
    fetchData,
    fetchLoading
  }
}