import { createApp } from "vue";
import App from "./App.vue";
import ClickOutside from "./directives/click-outside";

import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

import { createI18n } from "vue-i18n";
import deTranslations from "./i18n/de";
import enTranslations from "./i18n/en";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const i18n = createI18n({
  locale: "de",
  fallbackLocale: "en",
  messages: {
    de: { ...deTranslations },
    en: { ...enTranslations },
  },
});
const app = createApp(App);

app.use(router);
app.use(i18n);
app.directive("click-outside", ClickOutside);
app.mount("#app");
