<template>
  <div
    class="settings-panel"
    :class="settingsOpenClass"
    v-click-outside="closeSettings"
  >
    <header class="settings-header">
      <h1 class="settings-heading" v-show="viewOpen">
        {{ this.$t(`setting.title`) }}
      </h1>
      <button class="btn btn--settings" @click="toggleSettings">
        <Icon class="icon" icon="mdi:gear" />
      </button>
    </header>

    <transition mode="in-out">
      <div class="settings-list" v-show="viewOpen">
        <SettingLanguage />
        <SettingUnit />
        <SettingTheme />
      </div>
    </transition>
  </div>
</template>

<script>
import Store from "@/store";
import { Icon } from "@iconify/vue";
import SettingLanguage from "./Settings/SettingLanguage";
import SettingUnit from "./Settings/SettingUnit";
import SettingTheme from "./Settings/SettingTheme";

export default {
  name: "SettingsMenu",
  components: { Icon, SettingLanguage, SettingUnit, SettingTheme },
  data() {
    return {
      viewObj: { view: this.$options, priority: 1 },
    };
  },
  computed: {
    viewOpen() {
      return Store.methods.isActiveView(this.viewObj);
    },
    settingsOpenClass() {
      return this.viewOpen ? "settings-open" : "";
    },
  },
  methods: {
    closeSettings() {
      Store.mutations.removeActiveView(this.viewObj);
    },
    toggleSettings() {
      if (this.viewOpen) {
        Store.mutations.removeActiveView(this.viewObj);
      } else {
        Store.mutations.addActiveView(this.viewObj);
      }
    },
  },
};
</script>

<style>
.settings-panel {
  padding: var(--settings-padding);
  border-radius: var(--global-border-radius-big);

  font-size: var(--global-font-size);
  font-weight: var(--global-font-weight);
  color: var(--text-color-contrast);

  position: fixed;
  top: var(--settings-position-button-page);
  right: var(--settings-position-button-page);
  z-index: 1000;

  display: flex;
  flex-direction: column;
  gap: var(--settings-gap-header-content);
  transition: background-color var(--global-animation-speed) ease;
}
.settings-open {
  background-color: var(--settings-bg-color);
  backdrop-filter: blur(var(--settings-bg-blur));
}
.settings-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.settings-heading {
  font-size: var(--global-font-size-heading);
  margin-right: auto;
}
.settings-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--settings-gap-setting);
}
.setting {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--settings-gap-label-toggle);
}
.setting-heading,
.toggle {
  font-size: var(--global-font-size);
}

/* Toggle */
.toggle {
  overflow: hidden;
  border-radius: var(--global-border-radius-med);
  background-color: rgba(255, 255, 255, 0.2);
  font-size: var(--global-font-size);
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.toggle label {
  padding: var(--settings-padding-toggle);
  cursor: pointer;
  text-align: center;
  transition: all var(--global-animation-speed) ease-in-out;
}
.toggle input[type="radio"] {
  display: none;
}
.toggle input[type="radio"]:checked + label {
  cursor: pointer;
  color: var(--text-color-contrast);
  background-color: var(--color-blue);
}

/* Button */
.btn.btn--settings {
  padding: var(--settings-btn-padding);
  border-radius: 50%;
}
.btn.btn--settings .icon {
  font-size: var(--settings-btn-icon-size);
  transition: var(--settings-btn-icon-animation);
}
.btn.btn--settings:hover > .icon {
  transform: rotate(90deg);
}
</style>
