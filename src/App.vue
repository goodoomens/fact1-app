<template>
  <SettingsMenu />
  <AppHeader />
  <NavigationBar />
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import Store from "@/store";
import AppHeader from "./components/AppHeader";
import NavigationBar from "./components/NavigationBar";
import SettingsMenu from "./components/SettingsMenu";

export default {
  name: "App",
  title: "Fact1 - F1 App",
  components: { AppHeader, NavigationBar, SettingsMenu },
  created() {
    Store.methods.initTheme();
  },
  mounted() {
    window.addEventListener("keydown", this.handleEsc);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleEsc);
  },
  methods: {
    handleEsc(e) {
      if (e.code === "Escape") {
        Store.methods.closeMostActiveView();
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Inconsolata:wght@600&display=swap");

/* 
Breakpoints
1: 1200px
2: 900px
3: 800px
4: 560px
5: 400px
6: 320px
7: 250px
*/

:root {
  /* Colors */
  --color-prim: #f6091f;
  --color-green: #37b24d;
  --color-yellow: #fab005;
  --color-red: #dd081c;
  --color-red-shad1: #dd081c;
  --color-grey: #5d6166;
  --color-grey-shad1: #dfdfe0;
  --color-grey-shad2: #ced0d1;
  --color-blue: #1c7ed6;
  --text-color-contrast: #ffffff;

  /*** Global ***/
  /* Font */
  --global-font-size: 1.4rem;
  --global-font-size-heading-small: 1.8rem;
  --global-font-size-heading: 2.4rem;
  --global-font-weight: 500;
  --global-animation-speed: 0.2s;
  /* Shadow */
  --global-shadow-top: 0 -0.25rem 2rem rgba(0, 0, 0, 0.1);
  --global-shadow-main: 0 0.25rem 1rem rgba(0, 0, 0, 0.2);
  --global-shadow-big: 0 0.5rem 2rem rgba(0, 0, 0, 0.1);
  --global-shadow-small: 0 0.25rem 1rem rgba(0, 0, 0, 0.1);
  /* Border Radius */
  --global-border-radius-pill: 10rem;
  --global-border-radius-big: 1rem;
  --global-border-radius-med: 0.5rem;
  /* Padding */
  --global-padding-ribbon: 0.5rem 1rem;
  --global-padding-ribbon-med: 0.8rem 1.2rem;

  /*** Components ***/
  /* Buttons */
  --btn-padding: 0.8rem 1.6rem;
  /* Navigation */
  --nav-font-size: 1.6rem;
  --nav-padding: 1.6rem;
  --nav-gap-link: 1rem;
  /* Cards */
  --card-padding-collapsed: 0.8rem 1.6rem;
  --card-padding: 3rem;
  --card-gap-inner: 3rem;
  --card-gap-between: 0.5rem;
  /* Times */
  --times-font-family: "Inconsolata", monospace;
  --times-font-size: 1.6rem;
  --times-indicator-size: 1rem;
  /* Driver Standings */
  --ds-max-width: 50rem;
  --ds-padding-card: 2rem;
  --ds-font-size-points: 4rem;
  --ds-font-size-name: 1.6rem;
  --ds-font-size-flag: 2rem;
  --ds-font-size-icon-add: 3rem;
  --ds-padding-icon-add: 0.25rem;
  --ds-inset-icon-add: 15%;
  --ds-gap-main: 2rem;
  --ds-gap-constructor-logo: 1rem;
  --ds-constructor-logo: 2.4rem;
  /* Driver Comparison */
  --dc-border-bottom-card: 0.25rem;
  --dc-border-bottom-card-selected: 0.5rem;
  --dc-btn-fonz-size: 1.6rem;
  /* Settings */
  --settings-position-button-page: 0.8rem;
  --settings-padding: 2rem;
  --settings-gap-header-content: 4rem;
  --settings-gap-setting: 2rem;
  --settings-gap-label-toggle: 1rem;
  --settings-padding-toggle: 1rem 2rem;
  --settings-font-size: 1.4rem;
  --settings-bg-color: rgba(0, 0, 0, 0.75);
  --settings-bg-blur: 4px;
  --settings-btn-padding: 1rem;
  --settings-btn-icon-size: 2.4rem;
  --settings-btn-icon-animation: transform 1s ease;
}

.light {
  --bg-color-body: #efeff0;
  --bg-color-card: #ffffff;
  --bg-color-sec: #efeff0;
  --text-color-prim: #343a40;
}

.dark {
  --bg-color-body: #343a40;
  --bg-color-card: #212529;
  --bg-color-sec: #111315;
  --text-color-prim: #ffffff;
}

/* Global and app styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  font-size: 62.5%;
  overflow-y: scroll;
}
body {
  font-family: "Inter", sans-serif;
  background-color: var(--bg-color-body);
  color: var(--text-color-prim);
  transition: background-color 0.3s ease-in-out;
}
#app {
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  gap: 2rem;
}
.container {
  width: 100%;
  max-width: 120rem;
  margin: auto;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

/* Buttons */
.btn {
  padding: var(--btn-padding);
  border: none;
  border-radius: var(--global-border-radius-big);
  background-color: var(--bg-color-card);

  display: flex;
  align-items: center;
  gap: 0.5rem;

  box-shadow: var(--global-shadow-small);
  transition: all var(--global-animation-speed) ease-in-out;
}
.btn:hover {
  box-shadow: var(--global-shadow-main);
}
.icon {
  font-size: 3rem;
  color: var(--text-color-prim);
}

/* Theming */
.dark .race-img {
  filter: invert(1);
}

/* Global animations */
.list-enter-from,
.list-leave-to,
.details-enter-from,
.details-leave-to {
  opacity: 0;
}
.list-enter-to,
.list-leave-from,
.details-enter-to,
.details-leave-from {
  opacity: 1;
}
.list-leave-active {
  position: absolute;
}
.details-enter-active,
.details-leave-active,
.v-enter-active,
.v-leave-active {
  transition: all var(--global-animation-speed) ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}

/* Media queries */
@media (max-width: 560px) {
  html {
    font-size: 50%;
  }
  .container {
    padding: 1rem;
  }
}
@media (max-width: 320px) {
  html {
    font-size: 40%;
  }
}
@media (max-width: 250px) {
  html {
    font-size: 30%;
  }
}
</style>
