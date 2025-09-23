<script setup lang="ts">
import type { Locale } from '@/models'

const model = defineModel()

type Language = {
  image: string
  locale: Locale
}

defineProps<{
  languages: Language[]
  mobile?: boolean
}>()

const setLanguage = (lang: string) => {
  localStorage.setItem('lang', lang)
  model.value = lang
}

const isSelected = (lang: string) => model.value === lang
</script>

<template>
  <div class="flex gap-5">
    <template v-for="language in languages" :key="language.locale">
      <img
        class="w-8 rounded-full"
        :class="[
          isSelected(language.locale) ? 'outline-2 outline-offset-2 outline-blue-600' : 'opacity-50 cursor-pointer hover:opacity-70',
          mobile ? 'w-10' : 'w-8'
        ]"
        :src="language.image"
        @click="setLanguage(language.locale)"
      />
    </template>
  </div>
</template>
