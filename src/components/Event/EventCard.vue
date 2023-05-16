<template>
  <div class="event-card" @click="toggleHighlight" :class="highlightClass">
    <EventHeader :event="event" :isHighlighted="isHighlighted" />
    <div class="event-data" v-if="isHighlighted">
      <CircuitImage :circuitId="event.Circuit.circuitId" />
      <CircuitDetails :circuitId="event.Circuit.circuitId" />
      <EventTimes :eventTimes="wrapEventTimes" />
    </div>
  </div>
</template>

<script>
import Store from "@/store";
import standingsMixin from "@/mixins/standingsMixin";
import EventHeader from "./EventHeader";
import CircuitImage from "./CircuitImage";
import CircuitDetails from "./CircuitDetails";
import EventTimes from "./EventTimes";

export default {
  name: "EventCard",
  components: { EventHeader, CircuitImage, CircuitDetails, EventTimes },
  mixins: [standingsMixin],
  props: {
    event: {
      type: Object,
      required: true,
    },
  },

  computed: {
    isSprintRace() {
      return Reflect.has(this.event, "Sprint");
    },
    isHighlighted() {
      return this.event === Store.getters.highlightedEvent();
    },
    highlightClass() {
      return this.isHighlighted ? "highlight" : "";
    },
    wrapEventTimes() {
      const eventTimes = [
        {
          id: "fp1",
          date: this.event.FirstPractice.date,
          time: this.event.FirstPractice.time,
        },
        {
          id: "fp2",
          date: this.event.SecondPractice.date,
          time: this.event.SecondPractice.time,
        },
        {
          id: "quali",
          date: this.event.Qualifying.date,
          time: this.event.Qualifying.time,
        },
        { id: "race", date: this.event.date, time: this.event.time },
      ];

      if (this.isSprintRace) {
        eventTimes.splice(eventTimes.length - 1, 0, {
          id: "sprint",
          date: this.event.Sprint.date,
          time: this.event.Sprint.time,
        });
        eventTimes[1].id = "shootout";
        [eventTimes[1], eventTimes[2]] = [eventTimes[2], eventTimes[1]];
      } else {
        eventTimes.splice(2, 0, {
          id: "fp3",
          date: this.event.ThirdPractice.date,
          time: this.event.ThirdPractice.time,
        });
      }

      return eventTimes;
    },
  },
  methods: {
    toggleHighlight() {
      Store.mutations.setHighlightEvent(this.event);
    },
  },
};
</script>

<style>
.event-card {
  width: 100%;
  padding: var(--card-padding-collapsed);
  background-color: var(--bg-color-card);
  box-shadow: var(--global-shadow-main);
  border-radius: var(--global-border-radius-big);
  color: var(--text-color-prim);

  display: flex;
  align-items: center;
  gap: var(--card-gap-inner);

  filter: opacity(0.5);
  transition: all var(--global-animation-speed) ease-in-out;
}
.event-card:hover {
  filter: opacity(1);
}

/* Highlighting */
.event-card.highlight {
  padding: var(--card-padding);
  filter: opacity(1);
  z-index: 100;
  flex-direction: column;
}
.event-data {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 2fr 2fr 3fr;
  align-items: flex-start;
  justify-items: center;
  gap: var(--card-gap-inner);
}

/* Media queries */
@media (max-width: 1200px) {
  .event-data {
    grid-template-columns: 2fr 3fr;
  }
  .circuit-img {
    width: 35% !important;
    grid-column: 1 / -1;
  }
}

@media (max-width: 900px) {
  .event-data {
    grid-template-columns: 1fr 1fr;
  }
  .details-list--time div {
    flex-direction: column;
    align-items: flex-start;
  }
  .circuit-img {
    width: 50% !important;
  }
}

@media (max-width: 800px) {
  .event-data {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .details-list--time div {
    flex-direction: row;
    align-items: center;
  }
  .circuit-img {
    width: 70% !important;
  }
}

@media (max-width: 400px) {
  .details-list--time div {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
