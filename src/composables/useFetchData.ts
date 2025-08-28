import { ref } from 'vue'
import axios from 'axios'
import { get } from 'lodash'

type FetchKey = 'calendar' | 'driverStandings' | 'teamStandings'

const API_URLS = {
  calendar: {
    url: 'https://api.jolpi.ca/ergast/f1/current',
    path: 'MRData.RaceTable.Races'
  },
  driverStandings: {
    url: 'https://api.jolpi.ca/ergast/f1/current/driverstandings',
    path: 'MRData.StandingsTable.StandingsLists[0].DriverStandings'
  },
  teamStandings: {
    url: 'https://api.jolpi.ca/ergast/f1/current/constructorstandings',
    path: 'MRData.StandingsTable.StandingsLists[0].ConstructorStandings'
  }
}

export default () => {
  const fetchLoading = ref()

  const fetchData = async (key: FetchKey) => {
    fetchLoading.value = true
    const response = await axios.get(API_URLS[key].url)
    fetchLoading.value = false
    return get(response.data, API_URLS[key].path)
  }

  return {
    fetchData,
    fetchLoading
  }
}
