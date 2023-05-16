<template>
  <nav class="navigation-bar">
    <ul class="navigation-list">
      <li>
        <router-link to="/event-calendar">{{ $t("nav.calendar") }}</router-link>
      </li>
      <li>
        <router-link to="/driver-standings">{{
          $t("nav.drivers")
        }}</router-link>
      </li>
      <li>
        <router-link to="/constructor-standings">{{
          $t("nav.constructors")
        }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavigationBar",
  mounted() {
    window.addEventListener("keydown", this.changeView);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.changeView);
  },
  methods: {
    changeView(e) {
      const filteredRoutes = this.$router.options.routes.filter(
        (route) => !route.redirect
      );
      const currentIndex = filteredRoutes.findIndex(
        (route) => route.path === this.$route.path
      );

      let newIndex;

      if (e.code === "ArrowLeft") {
        newIndex =
          currentIndex === 0 ? filteredRoutes.length - 1 : currentIndex - 1;
        this.$router.push(filteredRoutes[newIndex].path);
      } else if (e.code === "ArrowRight") {
        newIndex =
          currentIndex === filteredRoutes.length - 1 ? 0 : currentIndex + 1;
        this.$router.push(filteredRoutes[newIndex].path);
      }
    },
  },
};
</script>

<style scoped>
.navigation-bar {
  width: 100%;
}
.navigation-list {
  padding: var(--nav-padding);

  list-style: none;
  font-size: var(--nav-font-size);
  font-weight: var(--global-font-weight);

  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--nav-gap-link);

  background-color: var(--bg-color-card);
  box-shadow: var(--global-shadow-big);
}
.navigation-list li a {
  padding: var(--global-padding-ribbon);
  border-radius: var(--global-border-radius-med);
  text-decoration: none;
  color: var(--text-color-prim);
  transition: background-color var(--global-animation-speed) ease;
}
.navigation-list li a:hover {
  background-color: var(--bg-color-sec);
}
.navigation-list li a.router-link-active {
  background-color: var(--color-prim);
  color: var(--text-color-contrast);
}
</style>
