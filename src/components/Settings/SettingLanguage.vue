<template>
  <div class="setting setting--lang">
    <h2 class="setting-heading">{{ $t("setting.lang") }}</h2>
    <form class="toggle">
      <template v-for="lang in langs" :key="lang.locale">
        <input
          type="radio"
          name="lang"
          :id="lang.locale"
          :value="lang.locale"
          v-model="$i18n.locale"
        />
        <label class="lang-label" :for="lang.locale">
          <span class="lang-emoji">{{ lang.emoji }}</span>
          <span class="lang-text">{{ lang.text }}</span>
        </label>
      </template>
    </form>
  </div>
</template>

<script>
export default {
  name: "SettingLanguage",
  data() {
    return {
      langs: [
        { locale: "de", text: "Deutsch", emoji: "🇩🇪" },
        { locale: "en", text: "English", emoji: "🇺🇸" },
      ],
    };
  },
};
</script>

<style scoped>
.lang-label {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}
.lang-emoji {
  font-size: 2.4rem;
}
</style>
