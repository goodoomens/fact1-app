<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { NavigationMobile, HamburgerButton, LanguageSwitcher } from '@/components'
import { navigationItems } from '@/router'
import { languages } from '@/layouts/shared/languages.ts'
import fact1_logo from '@/assets/fact1_logo.svg'

const { locale: currentLocale } = useI18n()
const menuIsOpen = ref(false)
</script>

<template>
  <div class="sticky top-0 z-20">
    <div class="bg-gradient-to-r from-red-500 to-red-800 shadow-md z-10 flex justify-center">
      <div class="w-full max-w-3xl flex items-center justify-between px-5 py-3">
        <HamburgerButton v-model="menuIsOpen" />
        <div class="flex flex-col items-end text-white gap-2">
          <img class="h-5" alt="Fact1" :src="fact1_logo" />
          <span class="text-xs leading-2">{{ $t('global.season') }} 2025</span>
        </div>
      </div>
    </div>
    <NavigationMobile class="z-30" v-model="menuIsOpen" :items="navigationItems">
      <template #append>
        <div class="ml-auto p-5">
          <LanguageSwitcher v-model="currentLocale" :languages="languages" mobile />
        </div>
      </template>
    </NavigationMobile>
  </div>
</template>
