import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import TeamStandings from '../../src/views/TeamStandings.vue'
import { useTeamStandingsStore } from '../../src/stores'

vi.mock('@/mappings', () => ({
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
  const wrapper = mount(TeamStandings, {
    global: {
      plugins: [pinia],
      stubs: { ProgressBar: true },
      mocks: { $t: (k: string) => k }
    }
  })
  return wrapper
}

describe('TeamStandings.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows ProgressBar when data is not loaded', () => {
    const wrapper = mountWithPinia()
    expect(wrapper.find('[data-ident="progress"]').exists()).toBe(true)
  })

  it('renders team standings when loaded', async () => {
    const wrapper = mountWithPinia()
    const store = useTeamStandingsStore()

    store.teamStandings = [
      {
        position: '1',
        positionText: '1',
        points: '321',
        wins: '8',
        Constructor: {
          constructorId: 'mercedes',
          url: '',
          name: 'Mercedes',
          nationality: 'DE'
        }
      }
    ] as any
    store.isLoaded = true as any

    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-ident="progress"]').exists()).toBe(false)

    // Position, team name and points
    expect(wrapper.text()).toContain('1')
    expect(wrapper.text()).toContain('Mercedes')
    expect(wrapper.text()).toContain('321')
    expect(wrapper.text()).toContain('global.pts')

    // Team color class
    const colorBar = wrapper.find('div.w-2')
    expect(colorBar.classes()).toContain('bg-green-500')

    // Team logo image used
    const logo = wrapper.find('img.w-10')
    expect(logo.exists()).toBe(true)
    expect((logo.element as HTMLImageElement).getAttribute('src')).toBe('logo-mercedes.svg')
  })
})
