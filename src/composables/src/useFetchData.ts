import { ref } from 'vue'
import axios from 'axios'
import { get } from 'lodash'

type FetchKey = 'races' | 'driverStandings' | 'teamStandings' | 'results'

type ApiEntry = {
  url: string | ((options?: { round?: number; year?: number | string }) => string)
  path: string
}

const DEFAULT_YEAR = 'current'

const API_URLS: Record<FetchKey, ApiEntry> = {
  races: {
    url: (options) => `https://api.jolpi.ca/ergast/f1/${options?.year ?? DEFAULT_YEAR}/`,
    path: 'MRData.RaceTable.Races'
  },
  driverStandings: {
    url: (options) =>
      `https://api.jolpi.ca/ergast/f1/${options?.year ?? DEFAULT_YEAR}/driverstandings/`,
    path: 'MRData.StandingsTable.StandingsLists[0].DriverStandings'
  },
  teamStandings: {
    url: (options) =>
      `https://api.jolpi.ca/ergast/f1/${options?.year ?? DEFAULT_YEAR}/constructorstandings/`,
    path: 'MRData.StandingsTable.StandingsLists[0].ConstructorStandings'
  },
  results: {
    url: (options) =>
      options?.round
        ? `https://api.jolpi.ca/ergast/f1/${options?.year ?? DEFAULT_YEAR}/${options.round}/results/`
        : `https://api.jolpi.ca/ergast/f1/${options?.year ?? DEFAULT_YEAR}/results`,
    path: 'MRData.RaceTable.Races[0]'
  }
}

export default () => {
  const fetchLoading = ref(false)

  const fetchData = async (key: FetchKey, options?: { round?: number; year?: number | string }) => {
    fetchLoading.value = true

    const url =
      typeof API_URLS[key].url === 'function'
        ? API_URLS[key].url(options)
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