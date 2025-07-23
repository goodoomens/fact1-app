// import Dashboard from '@/views/Dashboard.vue'
import Calendar from '@/views/Calendar.vue'
import Race from '@/views/Race.vue'
import TeamStandings from '@/views/TeamStandings.vue'
import DriverStandings from '@/views/DriverStandings.vue'
// import Settings from '@/views/Settings.vue'

export const routes = [
  //   {
  //     path: '/dashboard',
  //     name: 'dashboard',
  //     component: Dashboard,
  //     label: 'Dashboard',
  //     icon: 'pi pi-home',
  //   },
  {
    path: '/',
    name: 'calendar',
    component: Calendar,
    label: 'Calendar',
    icon: 'pi pi-calendar',
  },
  {
    path: '/race/:circuitId',
    name: 'race',
    component: Race,
    label: 'Race',
    icon: 'pi pi-flag',
  },
  {
    path: '/driver-standings',
    name: 'driverStandings',
    component: DriverStandings,
    label: 'Driver Standings',
    icon: 'pi pi-trophy',
  },
  {
    path: '/team-standings',
    name: 'teamStandings',
    component: TeamStandings,
    label: 'Team Standings',
    icon: 'pi pi-trophy',
  },
  // {
  //     path: '/settings',
  //     name: 'settings',
  //     component: Settings,
  //     label: 'Settings',
  //     icon: 'pi pi-cog'
  // }
]
