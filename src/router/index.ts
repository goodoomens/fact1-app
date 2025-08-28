import Calendar from '@/views/Calendar.vue'
import Race from '@/views/Race.vue'
import TeamStandings from '@/views/TeamStandings.vue'
import DriverStandings from '@/views/DriverStandings.vue'
// import Dashboard from '@/views/Dashboard.vue'
// import Settings from '@/views/Settings.vue'

export const routes = [
  {
    path: '/',
    name: 'calendar',
    component: Calendar,
    labelKey: 'global.calendar',
    icon: 'pi pi-calendar'
  },
  {
    path: '/race/:circuitId',
    name: 'race',
    component: Race,
    labelKey: 'global.race',
    icon: 'pi pi-flag'
  },
  {
    path: '/driver-standings',
    name: 'driverStandings',
    component: DriverStandings,
    labelKey: 'global.driverStandings',
    icon: 'pi pi-trophy'
  },
  {
    path: '/team-standings',
    name: 'teamStandings',
    component: TeamStandings,
    labelKey: 'global.teamStandings',
    icon: 'pi pi-trophy'
  }
  // {
  //   path: '/dashboard',
  //   name: 'dashboard',
  //   component: Dashboard,
  //   labelKey: 'global.dashboard',
  //   icon: 'pi pi-home'
  // },
  // {
  //   path: '/settings',
  //   name: 'settings',
  //   component: Settings,
  //   labelKey: 'global.settings',
  //   icon: 'pi pi-cog'
  // }
]
