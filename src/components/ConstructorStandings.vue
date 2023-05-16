<template>
  <div class="standings">
    <div v-if="isLoading" class="loading">Loading...</div>

    <div class="standings-list" v-if="!isLoading">
      <template
        v-for="constructor in constructors"
        :key="constructor.Constructor.constructorId"
      >
        <div class="position">
          {{ fillZero(constructor.position) }}
        </div>

        <img
          class="constructor-logo"
          :src="getConstructorImg(constructor.Constructor.constructorId)"
          :alt="constructor.Constructor.name + ' Logo'"
        />

        <div class="nationality">
          {{ getFlagEmoji(constructor.Constructor.nationality) }}
        </div>

        <div
          class="color"
          :style="getConstructorColor(constructor.Constructor.constructorId)"
        >
          <div class="name">
            {{ constructor.Constructor.name }}
          </div>
          <div class="points">{{ constructor.points }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import standingsMixin from "@/mixins/standingsMixin";
import { fetchDataWithFallback } from "@/utils/api";

export default {
  name: "ConstructorStandings",
  mixins: [standingsMixin],
  data() {
    return {
      isLoading: true,
      constructors: [],
    };
  },
  methods: {
    async fetchConstructorStandings() {
      try {
        this.isLoading = true;
        this.constructors = await fetchDataWithFallback({
          key: "constructorStandings",
        });
      } catch (error) {
        console.error("Error fetching constructor standings:", error);
      } finally {
        this.isLoading = false;
        console.log("*** Fetching constructor standings done ***");
      }
    },
  },
  created() {
    this.fetchConstructorStandings();
  },
};
</script>

<style scoped>
@import "@/styles/standings.css";
</style>
