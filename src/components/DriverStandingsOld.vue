<template>
  <div class="standings">
    <div v-if="isLoading" class="loading">Loading...</div>

    <div class="standings-list" v-if="!isLoading">
      <template v-for="driver in drivers" :key="driver.Driver.driverId">
        <div class="position">{{ fillZero(driver.position) }}</div>

        <!-- Image -->
        <img
          class="constructor-logo"
          :src="getConstructorImg(driver.Constructors[0].constructorId)"
          :alt="driver.Constructors[0].constructorId + ' Logo'"
        />

        <!-- Flag Emoji -->
        <div class="nationality">
          {{ getFlagEmoji(driver.Driver.nationality) }}
        </div>

        <!-- Color -->
        <div
          class="color"
          :style="getConstructorColor(driver.Constructors[0].constructorId)"
        >
          <div class="name">
            {{ driver.Driver.givenName }} {{ driver.Driver.familyName }}
          </div>
          <div class="points">{{ driver.points }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import standingsMixin from "@/mixins/standingsMixin";
import { fetchDataWithFallback } from "@/utils/api";

export default {
  name: "DriverStandings",
  mixins: [standingsMixin],
  data() {
    return {
      isLoading: true,
      drivers: [],
    };
  },
  methods: {
    async fetchDriverStandings() {
      try {
        this.isLoading = true;
        this.drivers = await fetchDataWithFallback("driverStandings");
      } catch (error) {
        console.error("Error fetching driver standings:", error);
      } finally {
        this.isLoading = false;
        console.log("*** Fetching driver standings done ***");
      }
    },
    getDriverImgPath(driver, format) {
      return require(`@/assets/drivers/${driver.Driver.code.toLowerCase()}.${format}`);
    },
  },
  created() {
    this.fetchDriverStandings();
  },
};
</script>

<style scoped>
@import "@/styles/standings.css";
</style>
