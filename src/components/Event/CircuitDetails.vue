<template>
  <div class="details-list">
    <div>
      <span>{{ $t("detail.laps") }}</span>
      <span>{{ raceLaps }}</span>
    </div>
    <div>
      <span>{{ $t("detail.length") }}</span>
      <span>{{ circuitLength }} {{ unit }}</span>
    </div>
    <div>
      <span>{{ $t("detail.distance") }}</span>
      <span>{{ raceDistance }} {{ unit }}</span>
    </div>

    <div>
      <span>{{ $t("detail.tireDeg") }}</span>
      <span class="detail-deg" :class="degClasses[tireDeg]">
        <img
          class="deg-symbol"
          src="@/assets/symbols/tire_symbol.png"
          alt="Tire Symbol"
        />{{ tireDegLabel }}</span
      >
    </div>

    <div>
      <span>{{ $t("detail.brakeDeg") }}</span>
      <span class="detail-deg" :class="degClasses[brakeDeg]">
        <img
          class="deg-symbol"
          src="@/assets/symbols/brake_symbol.png"
          alt="Brake Symbol"
        />{{ brakeDegLabel }}</span
      >
    </div>
  </div>
</template>

<script>
import Store from "@/store";
import circuitDetailsMapping from "@/mappings/circuitDetailsMapping";

export default {
  name: "CircuitDetails",
  props: {
    circuitId: {
      type: String,
      required: true,
    },
  },
  computed: {
    raceLaps() {
      return circuitDetailsMapping[this.circuitId].laps;
    },
    circuitLength() {
      const unit = Store.getters.unitSelected();
      const length = circuitDetailsMapping[this.circuitId].length;
      const circuitLength =
        unit === "km" ? Math.trunc(length) : Math.trunc(length * 0.6214);
      return (circuitLength / 1000).toFixed(2);
    },
    raceDistance() {
      return (this.circuitLength * this.raceLaps).toFixed(2);
    },
    tireDeg() {
      return circuitDetailsMapping[this.circuitId].tireDeg;
    },
    brakeDeg() {
      return circuitDetailsMapping[this.circuitId].brakeDeg;
    },
    tireDegLabel() {
      return this.$t(`degredation.${this.tireDeg}`);
    },
    brakeDegLabel() {
      return this.$t(`degredation.${this.brakeDeg}`);
    },
    unit() {
      const unit = Store.getters.unitSelected();
      return this.$t(`unit.${unit}`);
    },
    degClasses() {
      return [
        "detail-deg-low",
        "detail-deg-medium",
        "detail-deg-high",
        "detail-deg-unknown",
      ];
    },
  },
};
</script>

<style scoped>
@import "@/styles/list.css";
.deg-symbol {
  width: 1.4rem;
}
.detail-deg {
  padding: var(--global-padding-ribbon);
  border-radius: var(--global-border-radius-med);
  color: var(--text-color-contrast);

  display: flex;
  align-items: center;
  gap: 0.8rem;
}
.detail-deg-unknown {
  background-color: var(--color-grey);
}
.detail-deg-low {
  background-color: var(--color-green);
}
.detail-deg-medium {
  background-color: var(--color-yellow);
}
.detail-deg-high {
  background-color: var(--color-red);
}
</style>
