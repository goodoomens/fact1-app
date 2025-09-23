import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import useFetchData from '../../src/composables/src/useFetchData'

vi.mock('axios', () => ({
  default: {
    get: vi.fn()
  }
}))

const mockApiData = {
  calendar: { MRData: { RaceTable: { Races: [{ round: 1 }, { round: 2 }] } } },
  driverStandings: { MRData: { StandingsTable: { StandingsLists: [{ DriverStandings: [{ driver: 'A' }] }] } } },
  teamStandings: { MRData: { StandingsTable: { StandingsLists: [{ ConstructorStandings: [{ team: 'T' }] }] } } }
}

describe('useFetchData composable', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetchData should toggle loading and return calendar data path', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: mockApiData.calendar })
    const { fetchData, fetchLoading } = useFetchData()
    expect(fetchLoading.value).toBe(false)
    const promise = fetchData('calendar')
    expect(fetchLoading.value).toBe(true)
    const result = await promise
    expect(fetchLoading.value).toBe(false)
    expect(result).toEqual([{ round: 1 }, { round: 2 }])
  })

  it('fetchData should return driver standings path', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: mockApiData.driverStandings })
    const { fetchData } = useFetchData()
    const result = await fetchData('driverStandings')
    expect(result).toEqual([{ driver: 'A' }])
  })

  it('fetchData should return team standings path', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: mockApiData.teamStandings })
    const { fetchData } = useFetchData()
    const result = await fetchData('teamStandings')
    expect(result).toEqual([{ team: 'T' }])
  })
})
