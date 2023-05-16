<template>
  <div class="setting setting--theme">
    <h2 class="setting-heading">{{ $t("setting.theme") }}</h2>
    <form class="toggle">
      <template v-for="theme in themes" :key="theme">
        <input
          type="radio"
          name="theme"
          :id="theme"
          :value="theme"
          v-model="themeStore"
        />
        <label :for="theme">{{ $t(`dict.${theme}`) }}</label>
      </template>
    </form>
  </div>
</template>

<script>
import Store from "@/store";

export default {
  name: "SettingTheme",
  data() {
    return {
      themes: ["light", "dark"],
    };
  },
  computed: {
    themeStore: {
      get() {
        return Store.getters.themeSelected();
      },
      set(value) {
        Store.methods.changeTheme(value);
      },
    },
  },
};
</script>

<style scoped></style>
