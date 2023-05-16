<template>
  <EventCollapser />
  <div class="event-list">
    <transition-group name="list">
      <EventCard
        v-for="event in filteredEvents"
        :key="event.round"
        :event="event"
      />
    </transition-group>
  </div>
</template>

<script>
import { fetchDataWithFallback } from "@/utils/api";
import Store from "@/store";
import EventCollapser from "./Event/EventCollapser";
import EventCard from "./Event/EventCard";

export default {
  name: "EventCalendar",
  components: { EventCollapser, EventCard },
  mounted() {
    window.addEventListener("keydown", this.changeCard);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.changeCard);
  },
  data() {
    return {
      currentDate: Store.getters.currentDate(),
      isLoading: true,
      events: [],
    };
  },
  computed: {
    filteredEvents() {
      return this.events.filter(
        (event) =>
          event === Store.getters.upcomingEvent() ||
          Store.getters.showOtherEvents()
      );
    },
  },
  methods: {
    async fetchEvents() {
      try {
        this.isLoading = true;
        this.events = await fetchDataWithFallback({ key: "events" });
      } catch (error) {
        console.error("Error events:", error);
      } finally {
        this.isLoading = false;
        console.log("*** Fetching events done ***");
        this.findUpcomingEvent();
      }
    },
    findUpcomingEvent() {
      const upcomingEvents = this.events.filter((event) => {
        const raceDate = new Date(event.date);
        return raceDate >= this.currentDate;
      });
      Store.mutations.setUpcomingEvent(upcomingEvents[0]);
      Store.mutations.setHighlightEvent(upcomingEvents[0]);
      console.log(
        `*** Upcoming event found: ${upcomingEvents[0].raceName} @ ${upcomingEvents[0].date} ***`
      );
    },
    changeCard(e) {
      const arrowKeys = [37, 38, 39, 40];

      if (arrowKeys.includes(e.keyCode)) {
        e.preventDefault();
      }

      if (!Store.getters.showOtherEvents()) return;

      const eventsLength = this.events.length;
      const highlightedEvent = Store.getters.highlightedEvent();
      const currentIndex = this.events.findIndex(
        (event) => event === highlightedEvent
      );

      let newIndex;

      if (e.code === "ArrowUp") {
        newIndex = currentIndex === 0 ? eventsLength - 1 : currentIndex - 1;
      } else if (e.code === "ArrowDown") {
        newIndex = currentIndex === eventsLength - 1 ? 0 : currentIndex + 1;
      } else {
        return;
      }

      Store.mutations.setHighlightEvent(this.events[newIndex]);
    },
  },
  created() {
    this.fetchEvents();
  },
};
</script>

<style scoped>
.event-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--card-gap-between);
  position: relative;
}
</style>
