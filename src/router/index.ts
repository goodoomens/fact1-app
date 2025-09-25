import Calendar from '@/views/Calendar.vue'
import Race from '@/views/Race.vue'
import TeamStandings from '@/views/TeamStandings.vue'
import DriverStandings from '@/views/DriverStandings.vue'
import DriverStatistics from '@/views/DriverStatistics.vue'

export const routes = [
  {
    path: '/',
    name: 'calendar',
    component: Calendar
  },
  {
    path: '/race/:circuitId',
    name: 'race',
    component: Race
  },
  {
    path: '/driver-standings',
    name: 'driverStandings',
    component: DriverStandings
  },
  {
    path: '/team-standings',
    name: 'teamStandings',
    component: TeamStandings
  },
  {
    path: '/driver-statistics/:driverIds+',
    name: 'driverStatistics',
    component: DriverStatistics,
    props: route => ({
      driverIds: route.params.driverIds
    })
  }
]

export const navigationItems = [
  {
    routeName: 'calendar',
    labelKey: 'global.calendar',
    icon: 'pi pi-calendar'
  },
  {
    routeName: 'driverStandings',
    labelKey: 'global.driverStandings',
    icon: 'pi pi-trophy'
  },
  {
    routeName: 'teamStandings',
    labelKey: 'global.teamStandings',
    icon: 'pi pi-trophy'
  }
]
