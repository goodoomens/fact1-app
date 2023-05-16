<template>
  <header class="app-header">
    <img class="app-logo" src="@/assets/fact1_logo.png" alt="Fact1 Logo" />
    <h1 class="app-subtitle">
      {{ $t("header.subTitle") }} &bull; {{ $t("dict.season") }}
      {{ currentYear }}
    </h1>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style scoped>
.app-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
}
.app-logo {
  width: 10rem;
}
.app-subtitle {
  font-size: var(--global-font-size-heading-small);
}
</style>
