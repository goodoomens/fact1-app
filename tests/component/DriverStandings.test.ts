import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import DriverStandings from '../../src/views/DriverStandings.vue'
import { useDriverStandingsStore } from '../../src/stores'

vi.mock('@/mappings', () => ({
  driverCodePhoto: {
    ABC: 'driver-abc.jpg'
  },
  constructorIdTeamColor: {
    mercedes: { bg: 'bg-green-500' }
  },
  constructorIdTeamLogo: {
    mercedes: 'logo-mercedes.svg'
  }
}))

const mountWithPinia = () => {
  const pinia = createPinia()
  setActivePinia(pinia)
  const wrapper = mount(DriverStandings, {
    global: {
      plugins: [pinia],
      stubs: { ProgressBar: true },
      mocks: { $t: (k: string) => k }
    }
  })
  return wrapper
}

describe('DriverStandings.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows ProgressBar when data is not loaded', () => {
    const wrapper = mountWithPinia()
    expect(wrapper.find('[data-ident="progress"]').exists()).toBe(true)
  })

  it('renders driver standings when loaded', async () => {
    const wrapper = mountWithPinia()
    const store = useDriverStandingsStore()

    store.driverStandings = [
      {
        position: '1',
        positionText: '1',
        points: '200',
        wins: '5',
        Driver: {
          driverId: 'hamilton',
          permanentNumber: '44',
          code: 'ABC',
          url: '',
          givenName: 'Lewis',
          familyName: 'Hamilton',
          dateOfBirth: '1985-01-07',
          nationality: 'GBR'
        },
        Constructors: [
          { constructorId: 'mercedes-old', url: '', name: 'Mercedes', nationality: 'DE' },
          { constructorId: 'mercedes', url: '', name: 'Mercedes', nationality: 'DE' }
        ]
      }
    ] as any
    store.isLoaded = true as any

    await wrapper.vm.$nextTick()

    // Progress bar gone
    expect(wrapper.find('[data-ident="progress"]').exists()).toBe(false)

    // Position displayed
    expect(wrapper.text()).toContain('1')

    // Driver family name uppercased
    expect(wrapper.text()).toContain('HAMILTON')

    // Team name and points
    expect(wrapper.text()).toContain('Mercedes')
    expect(wrapper.text()).toContain('200')
    expect(wrapper.text()).toContain('global.pts')

    // Driver photo
    const driverImg = wrapper.find('img.h-full.w-full')
    expect(driverImg.exists()).toBe(true)
    expect((driverImg.element as HTMLImageElement).getAttribute('src')).toBe('driver-abc.jpg')

    // Team logo
    const teamLogo = wrapper.find('img.h-4')
    expect(teamLogo.exists()).toBe(true)
    expect((teamLogo.element as HTMLImageElement).getAttribute('src')).toBe('logo-mercedes.svg')
  })
})
