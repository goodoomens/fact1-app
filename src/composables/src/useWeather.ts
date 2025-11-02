import { ref } from 'vue'
import axios from 'axios'
import type { RaceEvent } from '@/models'

export type RaceDayForecast = {
  date: string
  tempMax: number | null
  tempMin: number | null
  precipitationSum: number | null
  precipitationProbabilityMax: number | null
  weathercode: number | null
  weatherIcon: string | null
  weatherLabel: string | null
  units: {
    temp: '°C'
    precipitation: 'mm'
  }
  source: 'open-meteo'
  fetchedAt: number
}

const cache = ref(new Map<string, RaceDayForecast | null>())
const loadingKeys = ref(new Set<string>())

const keyOf = (circuitId: string, date: string) => `${circuitId}-${date}`

function mapWeatherCode(code: number | null): { icon: string | null; label: string | null } {
  if (code == null) return { icon: null, label: null }
  // Ref: https://open-meteo.com/en/docs#api_form
  if (code === 0) return { icon: '☀️', label: 'Clear' }
  if ([1, 2].includes(code)) return { icon: '🌤️', label: 'Mainly clear' }
  if (code === 3) return { icon: '☁️', label: 'Overcast' }
  if ([45, 48].includes(code)) return { icon: '🌫️', label: 'Fog' }
  if ([51, 53, 55].includes(code)) return { icon: '🌦️', label: 'Drizzle' }
  if ([56, 57].includes(code)) return { icon: '🌧️', label: 'Freezing drizzle' }
  if ([61, 63, 65].includes(code)) return { icon: '🌧️', label: 'Rain' }
  if ([66, 67].includes(code)) return { icon: '🌧️', label: 'Freezing rain' }
  if ([71, 73, 75, 77].includes(code)) return { icon: '🌨️', label: 'Snow' }
  if ([80, 81, 82].includes(code)) return { icon: '🌦️', label: 'Rain showers' }
  if ([85, 86].includes(code)) return { icon: '🌨️', label: 'Snow showers' }
  if ([95, 96, 99].includes(code)) return { icon: '⛈️', label: 'Thunderstorm' }
  return { icon: '❓', label: 'Unknown' }
}

async function fetchRaceDayForecast(lat: number, lon: number, date: string) {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    timezone: 'auto',
    start_date: date,
    end_date: date,
    daily: [
      'weathercode',
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_sum',
      'precipitation_probability_max'
    ].join(',')
  })
  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`
  const { data } = await axios.get(url)
  const daily = data?.daily
  if (!daily || !Array.isArray(daily.time) || daily.time.length === 0) return null
  const idx = 0
  const wc: number | null = daily.weathercode?.[idx] ?? null
  const iconLabel = mapWeatherCode(typeof wc === 'number' ? wc : null)
  const forecast: RaceDayForecast = {
    date,
    tempMax: daily.temperature_2m_max?.[idx] ?? null,
    tempMin: daily.temperature_2m_min?.[idx] ?? null,
    precipitationSum: daily.precipitation_sum?.[idx] ?? null,
    precipitationProbabilityMax: daily.precipitation_probability_max?.[idx] ?? null,
    weathercode: typeof wc === 'number' ? wc : null,
    weatherIcon: iconLabel.icon,
    weatherLabel: iconLabel.label,
    units: {
      temp: '°C',
      precipitation: 'mm'
    },
    source: 'open-meteo',
    fetchedAt: Date.now()
  }
  return forecast
}

export default function useWeather() {
  const get = (circuitId: string, date: string) => cache.value.get(keyOf(circuitId, date)) ?? null
  const isLoading = (circuitId: string, date: string) => loadingKeys.value.has(keyOf(circuitId, date))

  const ensureForecastForRace = async (race: RaceEvent) => {
    const circuitId = race.Circuit.circuitId
    const date = race.date // YYYY-MM-DD
    const key = keyOf(circuitId, date)
    if (cache.value.has(key) || loadingKeys.value.has(key)) return

    const latStr = race.Circuit.Location.lat
    const lonStr = race.Circuit.Location.long
    const lat = Number(latStr)
    const lon = Number(lonStr)
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      cache.value.set(key, null)
      return
    }

    const now = new Date()
    const raceDate = new Date(date + 'T00:00:00')
    const diffDays = (raceDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    if (diffDays > 16) {
      cache.value.set(key, null)
      return
    }

    loadingKeys.value.add(key)
    try {
      const result = await fetchRaceDayForecast(lat, lon, date)
      cache.value.set(key, result)
    } catch (e) {
      console.error('[weather] fetch error', e)
      cache.value.set(key, null)
    } finally {
      loadingKeys.value.delete(key)
    }
  }

  const ensureForRaces = async (races: RaceEvent[]) => {
    await Promise.all(races.map(ensureForecastForRace))
  }

  return {
    get,
    isLoading,
    ensureForecastForRace,
    ensureForRaces
  }
}
