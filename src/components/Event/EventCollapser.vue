<template>
  <button class="btn btn--race-collapser" @click="toggleShowOtherEvents">
    <Icon class="icon" icon="mdi:chevron-down-up" v-if="isExpanded" />
    <Icon class="icon" icon="mdi:chevron-up-down" v-else />
  </button>
</template>

<script>
import Store from "@/store";
import { Icon } from "@iconify/vue";

export default {
  name: "EventCollapser",
  components: { Icon },
  mounted() {
    window.addEventListener("keydown", this.handleSpace);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleSpace);
  },
  computed: {
    isExpanded() {
      return Store.getters.showOtherEvents();
    },
  },
  methods: {
    handleSpace(e) {
      if (e.code === "Space") {
        this.toggleShowOtherEvents();
      }
    },
    toggleShowOtherEvents() {
      const upcomingEvent = Store.getters.upcomingEvent();
      const highlightedEvent = Store.getters.highlightedEvent();
      if (highlightedEvent !== upcomingEvent || !highlightedEvent) {
        Store.mutations.setHighlightEvent(upcomingEvent);
      }
      Store.mutations.toggleShowOtherEvents();
    },
  },
};
</script>

<style scoped></style>
