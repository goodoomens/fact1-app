<template>
  <div class="driver-info">
    <header
      class="driver-info-header"
      :style="getConstructorColor(driverInfo.constructor.id)"
    >
      <span class="driver-info-name">
        {{ driverInfo.fullName }}
      </span>
      <span class="driver-info-nationality">
        {{ getFlagEmoji(driverInfo.nationality) }}
      </span>
    </header>
    <div class="driver-constructor">
      <img
        class="driver-constructor-logo"
        :src="getConstructorImg(driverInfo.constructor.id)"
        :alt="driverInfo.constructor.id + ' Logo'"
      />
      <span>
        {{ driverInfo.constructor.name }}
      </span>
    </div>
  </div>
</template>

<script>
import standingsMixin from "@/mixins/standingsMixin";

export default {
  name: "DriverInfo",
  mixins: [standingsMixin],
  props: {
    driverInfo: {
      type: Object,
      required: true,
    },
  },
  methods: {},
};
</script>

<style scoped>
.driver-info {
  align-self: flex-start;
  justify-self: flex-start;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: var(--ds-gap-main);

  z-index: 1;
}
.driver-info-header,
.driver-constructor {
  display: flex;
  align-items: center;
  gap: var(--ds-gap-constructor-logo);
}
.driver-info-header {
  padding: var(--global-padding-ribbon);
  border-radius: var(--global-border-radius-med);
  justify-content: space-between;
}
.driver-info-name {
  font-size: var(--ds-font-size-name);
  color: var(--text-color-contrast);
}
.driver-info-nationality {
  font-size: var(--ds-font-size-flag);
}
.driver-constructor {
  font-size: var(--global-font-size);
  font-weight: var(--global-font-weight);
}
.driver-constructor-logo {
  max-width: var(--ds-constructor-logo);
  max-height: var(--ds-constructor-logo);
}
</style>
