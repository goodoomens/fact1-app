<script setup lang="ts">
import { defineModel, defineProps, Component } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale: currentLocale } = useI18n()

import de_flag from '@/assets/flags/de.svg'
import en_flag from '@/assets/flags/uk.svg'

type Route = {
  path: string,
  name: string,
  component: Component,
  labelKey: string,
  icon: string,
}

const model = defineModel()

defineProps<{
  routes: Route[],
}>()

const languages = {
  en: {
    image: en_flag,
    locale: 'en'
  },
  de: {
    image: de_flag,
    locale: 'de'
  }
}

const setLanguage = (lang: string) => {
  localStorage.setItem('lang', lang)
  currentLocale.value = lang
}
</script>

<template>
  <div class="bg-[rgba(255,255,255,0.8)] backdrop-blur-md absolute left-0 w-full">
    <div
      v-if="model"
      class="mx-auto max-w-3xl flex flex-col items-start w-full h-screen"
    >
      <template v-for="route in routes" :key="route.name">
        <router-link
          class="text-md text-gray-900 font-medium px-8 py-5 flex items-center gap-5 w-full hover:bg-[rgba(0,0,0,0.1)] transition-all"
          :to="route.path" @click="model = !model"
        >
          <i :class="route.icon" />
          {{ $t(route.labelKey) }}
        </router-link>
        <hr class="w-full border-gray-900" />
      </template>
      <div class="flex justify-end gap-5 w-full p-5">
        <template v-for="language in languages" :key="language.locale">
          <img
            :class="currentLocale == language.locale ? 'outline-2 outline-offset-2 outline-blue-500' : 'opacity-50 cursor-pointer hover:opacity-70'"
            class="w-10 rounded-full"
            :src="language.image"
            @click="setLanguage(language.locale)"
          />
        </template>
      </div>
    </div>
  </div>
</template>
