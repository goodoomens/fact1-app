<template>
  <div class="standings">
    <div v-if="isLoading" class="loading">Loading...</div>
    <template v-else>
      <!-- Regular standings list -->
      <div v-if="!viewOpen" class="driver-standings-list">
        <DriverCard
          v-for="driver in drivers"
          :key="driver.Driver.driverId"
          :driver="driver"
          :class="{ selected: isInComparisonList(driver) }"
          @click="addRemoveDriverToComparisonList(driver)"
        />
      </div>
      <!-- Driver comparison -->
      <div v-else class="driver-comparison-grid">
        <div
          class="driver-comparison-card"
          v-for="driver in driverComparisonList"
          :key="driver.Driver.familyName"
        >
          <div class="driver-comparison-race-table">
            <span><strong>Race</strong></span>
            <span class="driver-comparison-cell"
              ><strong>Position</strong></span
            >
            <span class="driver-comparison-cell"><strong>Grid</strong></span>
            <span class="driver-comparison-cell"
              ><strong>Fastest Lap</strong></span
            >
            <hr class="driver-comparison-line" />
            <template v-for="race in driver.comparisonData" :key="race.round">
              <span>{{ clearEventName(race.raceName) }}</span>
              <span class="driver-comparison-cell">
                {{ getSafeData(race, "position")
                }}{{ getMedalEmoji(race.Results[0].position) }}</span
              >
              <span class="driver-comparison-cell">{{
                getSafeData(race, "grid")
              }}</span>
              <span class="driver-comparison-cell driver-comparison-lap-time">{{
                getSafeData(race, "fastestLapTime")
              }}</span>
            </template>
          </div>
          <DriverCardComparison
            class="driver-comparison-poster"
            :driver="driver"
          />
        </div>
        <button @click="closeComparison" class="btn btn--close-comparison">
          <Icon class="icon" icon="material-symbols:close-rounded" />CLOSE
        </button>
      </div>
    </template>
  </div>
</template>

<script>
import Store from "@/store";
import { Icon } from "@iconify/vue";
import DriverCard from "@/components/Driver/DriverCard";
import DriverCardComparison from "@/components/Driver/DriverCardComparison";
import formatMixin from "@/mixins/formatMixin";
import { fetchDataWithFallback } from "@/utils/api";

export default {
  name: "DriverStandings",
  components: { Icon, DriverCard, DriverCardComparison },
  mixins: [formatMixin],

  data() {
    return {
      viewObj: { view: this.$options, priority: 2 },
      isLoading: true,
      drivers: [],
      driverComparisonList: [],
    };
  },
  watch: {
    viewOpen: {
      handler(newState, oldState) {
        if (!newState && oldState && this.driversForComparison > 0) {
          this.emptyComparisonList();
        }
      },
      immediate: true,
    },
    driverComparisonList: {
      handler() {
        if (this.driversForComparison >= 2) {
          this.sortComparisonListByDriverPosition();
          Store.mutations.addActiveView(this.viewObj);
        } else {
          Store.mutations.removeActiveView(this.viewObj);
        }
      },
      deep: true,
    },
  },
  computed: {
    viewOpen() {
      return Store.methods.isActiveView(this.viewObj);
    },
    driversForComparison() {
      return this.driverComparisonList.length;
    },
  },
  methods: {
    async fetchDriverStandings() {
      try {
        this.isLoading = true;
        this.drivers = await fetchDataWithFallback({ key: "driverStandings" });
      } catch (error) {
        console.error("Error fetching driver standings:", error);
      } finally {
        this.isLoading = false;
        console.log("*** Fetching driver standings done ***");
        // this.addRemoveDriverToComparisonList(this.drivers[9]);
        // this.addRemoveDriverToComparisonList(this.drivers[17]);
      }
    },
    async fetchDriverComparisonData(driver) {
      if (driver.comparisonData) return;

      const driverId = driver.Driver.driverId;
      const customApiUrl = `https://ergast.com/api/f1/2023/drivers/${driverId}/results.json`;
      const customPath = "MRData.RaceTable.Races";

      try {
        driver.comparisonData = await fetchDataWithFallback({
          customApiUrl,
          customPath,
        });
      } catch (error) {
        console.error("Error fetching driver data:", error);
      } finally {
        console.log("*** Fetching driver data done ***");
      }
    },
    async addRemoveDriverToComparisonList(driver) {
      if (!this.isInComparisonList(driver)) {
        await this.fetchDriverComparisonData(driver);
        this.driverComparisonList.push(driver);
      } else {
        const idx = this.driverComparisonList.indexOf(driver);
        this.driverComparisonList.splice(idx, 1);
      }
    },
    getSafeData(race, property) {
      const result = race.Results[0];

      switch (property) {
        case "position":
          return result.position || "N/A";
        case "grid":
          return result.grid || "N/A";
        case "fastestLapTime":
          return (
            (result.FastestLap &&
              result.FastestLap.Time &&
              result.FastestLap.Time.time) ||
            "N/A"
          );
        default:
          return "N/A";
      }
    },
    driverForComparison() {
      return this.driverComparisonList.length;
    },
    isInComparisonList(driver) {
      return this.driverComparisonList.some(
        (d) => d.Driver.driverId === driver.Driver.driverId
      );
    },
    sortComparisonListByDriverPosition() {
      this.driverComparisonList.sort((a, b) => {
        return Number(a.position) - Number(b.position);
      });
    },
    emptyComparisonList() {
      this.driverComparisonList = [];
    },
    closeComparison() {
      this.emptyComparisonList();
    },
  },
  created() {
    this.fetchDriverStandings();
  },
};
</script>

<style>
/* Main standings list */
.driver-standings-list {
  display: flex;
  flex-direction: column;
  gap: var(--card-gap-between);
}
.selected {
  border-bottom: var(--dc-border-bottom-card-selected) solid var(--color-blue) !important;
}
/* Main comparison grid */
.driver-comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2rem;
}
.driver-comparison-card {
  background-color: var(--bg-color-card);
  border-radius: var(--global-border-radius-big);
  box-shadow: var(--global-shadow-small);
  overflow: hidden;

  display: flex;
  flex-direction: column;
}
.driver-comparison-race-table {
  padding: 2rem;
  font-size: var(--global-font-size);
  font-weight: var(--global-font-weight);

  display: grid;
  grid-template-columns: 1.5fr repeat(3, 1fr);
  gap: 1rem;
}
.driver-comparison-cell {
  justify-self: center;
}
.driver-comparison-lap-time {
  font-family: var(--times-font-family);
  font-size: var(--times-font-size);
}
.driver-comparison-line {
  height: 0.1rem;
  background-color: var(--color-grey-shad2);
  border: none;
  grid-column: 1/-1;
}
.driver-comparison-poster {
  box-shadow: var(--global-shadow-top);
}
.btn.btn--close-comparison {
  margin-top: 2rem;
  grid-column: 1 / -1;
  font-size: var(--dc-btn-fonz-size);
  font-weight: 800;
  color: var(--text-color-prim);
  justify-self: center;
}
@media (max-width: 700px) {
  .driver-comparison-grid {
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
}
</style>
