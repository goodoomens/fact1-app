<template>
  <div class="driver-card">
    <Icon class="icon-add" icon="material-symbols:add-circle" />
    <div class="driver-numbers">
      <DriverPoints :driverPoints="driver.points" />
      <DriverPosition :driverPosition="driver.position" />
    </div>
    <DriverInfo :driverInfo="wrapDriverInfo" />
    <DriverImage :driverCode="driver.Driver.code" :driverName="fullName" />
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import DriverPoints from "./DriverPoints";
import DriverPosition from "./DriverPosition";
import DriverInfo from "./DriverInfo";
import DriverImage from "./DriverImage";

export default {
  name: "DriverCard",
  components: { Icon, DriverPoints, DriverPosition, DriverInfo, DriverImage },
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
  overflow: hidden;
  max-width: var(--ds-max-width);
  padding: var(--ds-padding-card);
  background-color: var(--bg-color-card);
  border-bottom: var(--dc-border-bottom-card) solid rgba(0, 0, 0, 0.25);
  border-radius: var(--global-border-radius-big);
  box-shadow: var(--global-shadow-small);

  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  column-gap: var(--ds-gap-main);
  position: relative;

  transition: all var(--global-animation-speed) ease;
}
.driver-card:hover {
  transform: scale(1.05);
  box-shadow: var(--global-shadow-main);
  z-index: 100;
}
.driver-numbers {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
}
.icon-add {
  padding: var(--ds-padding-icon-add);
  background-color: var(--bg-color-card);
  border-radius: 50%;

  font-size: var(--ds-font-size-icon-add);
  color: var(--color-blue);

  position: absolute;
  top: 0;
  right: 0;
  transform: translate(
    calc(var(--ds-inset-icon-add) * -1),
    var(--ds-inset-icon-add)
  );

  opacity: 0;
  transition: all var(--global-animation-speed) ease;
}
.driver-card:hover .icon-add,
.selected .icon-add {
  opacity: 1;
}
</style>
