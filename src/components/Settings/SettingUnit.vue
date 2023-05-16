<template>
  <div class="setting setting--unit">
    <h2 class="setting-heading">{{ $t("setting.unit") }}</h2>
    <form class="toggle">
      <template v-for="unit in units" :key="unit">
        <input
          type="radio"
          name="unit"
          :id="unit"
          :value="unit"
          v-model="unitStore"
        />
        <label :for="unit">{{ $t(`unit.${unit}`) }}</label>
      </template>
    </form>
  </div>
</template>

<script>
import Store from "@/store";

export default {
  name: "SettingUnit",
  data() {
    return {
      units: ["km", "miles"],
    };
  },
  computed: {
    unitStore: {
      get() {
        return Store.getters.unitSelected();
      },
      set(value) {
        Store.mutations.setUnitSelected(value);
      },
    },
  },
};
</script>

<style scoped></style>
