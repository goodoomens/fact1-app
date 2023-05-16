<template>
  <header class="event-header">
    <p class="event-flag">
      {{ getFlagEmoji(event.Circuit.Location.country) }}
    </p>
    <div class="event-text">
      <h2 class="event-name">
        {{ clearEventName(event.raceName) }}
      </h2>
      <p class="event-locality" v-if="isHighlighted">
        {{ event.Circuit.Location.locality }}
      </p>
      <p class="event-date">
        {{ formatDateTime(event.date, null, $i18n.locale) }}
      </p>
    </div>
    <div class="event-timing">
      <div class="event-upcoming" v-if="isUpcoming">
        {{ upcomingText }}
      </div>
      <div class="event-timeleft" v-if="isComing">{{ timeLeftText }}</div>
    </div>
  </header>
</template>

<script>
import Store from "@/store";
import standingsMixin from "@/mixins/standingsMixin";
import formatMixin from "@/mixins/formatMixin";

export default {
  name: "EventHeader",
  mixins: [standingsMixin, formatMixin],
  props: {
    event: {
      type: Object,
      required: true,
    },
    isHighlighted: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      currentDate: new Date(),
    };
  },
  computed: {
    isUpcoming() {
      return this.event === Store.getters.upcomingEvent();
    },
    upcomingText() {
      return this.isUpcoming ? this.$t("dict.upcoming") : "";
    },
    isComing() {
      return this.timeLeft.days > 0;
    },
    timeLeft() {
      const raceDate = new Date(
        `${this.event.FirstPractice.date} ${this.event.FirstPractice.time}`
      );
      const diffInMs = raceDate.getTime() - this.currentDate;

      return this.msToTimeObj(diffInMs);
    },
    timeLeftText() {
      const daysString = `${this.timeLeft.days} ${this.$t(`dict.days`)}`;
      const timeString = `${this.timeLeft.hours
        .toString()
        .padStart(2, "0")}:${this.timeLeft.minutes
        .toString()
        .padStart(2, "0")}:${this.timeLeft.seconds
        .toString()
        .padStart(2, "0")} ${this.$t(`dict.until`)} FP1`;
      let outputString = daysString;

      if (this.isHighlighted) {
        outputString = `${daysString}, ${timeString}`;
      }

      return this.isComing ? outputString : "";
    },
  },
  methods: {
    msToTimeObj(ms) {
      const msPerSecond = 1000;
      const msPerMinute = 60 * msPerSecond;
      const msPerHour = 60 * msPerMinute;
      const msPerDay = 24 * msPerHour;

      const days = Math.floor(ms / msPerDay);
      const hours = Math.floor((ms % msPerDay) / msPerHour);
      const minutes = Math.floor((ms % msPerHour) / msPerMinute);
      const seconds = Math.floor((ms % msPerMinute) / msPerSecond);

      return { days, hours, minutes, seconds };
    },
    created() {
      setInterval(() => {
        this.currentDate = new Date();
      }, 1000);
    },
  },
};
</script>

<style scoped>
.event-header {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 1.6rem;
}
.event-header > * {
  line-height: 1;
}
.highlight .event-header {
  flex-direction: column;
}

.event-upcoming {
  padding: var(--global-padding-ribbon);
  font-size: 1rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;
  color: var(--text-color-contrast);
  background: var(--color-prim);
  border-radius: var(--global-border-radius-pill);
}

.event-flag {
  font-size: 2.8rem;
}
.highlight .event-flag {
  font-size: 5.6rem;
}

.event-text {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.highlight .event-text {
  flex-direction: column;
}

.event-name {
  font-size: 1.6rem;
  font-weight: 600;
}
.highlight .event-name {
  font-size: 2.6rem;
}

.event-locality,
.event-date {
  font-size: 1.2rem;
}
.highlight .event-locality,
.highlight .event-date {
  font-size: 1.8rem;
}

.event-timing {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 1rem;
}
.highlight .event-timing {
  flex-direction: column;
  margin-left: 0;
}

.event-timeleft {
  padding: var(--global-padding-ribbon);
  border-radius: var(--global-border-radius-med);
  background-color: var(--bg-color-sec);
  font-family: var(--times-font-family);
  font-size: var(--times-font-size);
  white-space: nowrap;
  color: var(--text-color-prim);
}

/* Animation */
.event-flag,
.event-name,
.event-date {
  transition: font-size var(--global-animation-speed) ease;
}
</style>
