<template>
  <div class="driver-card">
    <div class="driver-numbers">
      <DriverPoints :driverPoints="driver.points" />
      <DriverPosition :driverPosition="driver.position" />
    </div>
    <DriverInfo class="driver-card-item" :driverInfo="wrapDriverInfo" />
    <DriverImage
      class="driver-card-item"
      :driverCode="driver.Driver.code"
      :driverName="fullName"
    />
  </div>
</template>

<script>
import DriverPoints from "./DriverPoints";
import DriverPosition from "./DriverPosition";
import DriverInfo from "./DriverInfo";
import DriverImage from "./DriverImage";

export default {
  name: "DriverCard",
  components: { DriverPoints, DriverPosition, DriverInfo, DriverImage },
  computed: {
    wrapDriverInfo() {
      return {
        fullName: this.fullName,
        nationality: this.driver.Driver.nationality,
        constructor: {
          id: this.driver.Constructors[0].constructorId,
          name: this.driver.Constructors[0].name,
        },
      };
    },
    fullName() {
      return `${this.driver.Driver.givenName} ${this.driver.Driver.familyName}`;
    },
  },
  props: {
    driver: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.driver-card {
  max-width: 50rem;
  padding: 2rem;
  overflow: hidden;

  display: grid;
  grid-template-columns: 1fr 100fr;
  gap: 2rem;
  position: relative;

  transition: transform var(--global-animation-speed) ease;
}
.driver-numbers {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
}
.driver-card .driver-img-container {
  grid-column: 1 / -1;
}
</style>
