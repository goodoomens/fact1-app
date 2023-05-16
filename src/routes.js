import EventCalendar from "./components/EventCalendar";
import DriverStandings from "./components/DriverStandings";
import ConstructorStandings from "./components/ConstructorStandings";

export default [
  { path: "/", redirect: "/event-calendar" },
  { path: "/event-calendar", component: EventCalendar },
  { path: "/driver-standings", component: DriverStandings },
  { path: "/constructor-standings", component: ConstructorStandings },
];
