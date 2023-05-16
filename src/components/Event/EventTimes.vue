<template>
  <div class="details-list details-list--time">
    <div
      class="time"
      v-for="eventTime in eventTimes"
      :key="eventTime.id"
      :class="eventClasses[eventTime.id]"
    >
      <span>
        <strong>{{ this.$t(`timeLabel.${eventTime.id}`) }}</strong>
      </span>
      <span class="time--date-time">
        {{ formatDateTime(eventTime.date, eventTime.time, $i18n.locale, true) }}
      </span>
    </div>
  </div>
</template>

<script>
import formatMixin from "@/mixins/formatMixin";

export default {
  name: "EventTimes",
  mixins: [formatMixin],
  props: {
    eventTimes: {
      type: Array,
      required: true,
    },
  },
  computed: {
    eventClasses() {
      return {
        fp1: "time--fp",
        fp2: "time--fp",
        fp3: "time--fp",
        shootout: "time--shootout",
        sprint: "time--sprint",
        quali: "time--quali",
        race: "time--race",
      };
    },
  },
};
</script>

<style scoped>
@import "@/styles/list.css";

.time {
  padding-left: calc(var(--times-indicator-size) * 4);
  position: relative;
}
.time::before {
  content: "";
  width: var(--times-indicator-size);
  height: var(--times-indicator-size);
  background-color: var(--color-grey);
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(150%, -50%);
}
.time--fp::before {
  background-color: var(--color-green);
}
.time--shootout::before,
.time--quali::before {
  background-color: var(--color-yellow);
}
.time--sprint::before,
.time--race::before {
  background-color: var(--color-red);
}
.time--date-time {
  font-family: var(--times-font-family);
  font-size: var(--times-font-size);
}
</style>
