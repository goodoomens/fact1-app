<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useUnits } from '@/composables'
import { NavigationDesktop, LanguageSwitcher, TextSeparator, SimpleDialog, ToggleButton } from '@/components'
import { navigationItems } from '@/router'
import { languages } from '@/layouts/shared/languages.ts'
import fact1_logo from '@/assets/fact1_logo_red.svg'

const { locale: currentLocale } = useI18n()
const { unit: currentUnit } = useUnits(currentLocale)

const options = ['km', 'miles']
</script>

<template>
  <div class="flex flex-col items-center gap-3 p-8">
    <img class="h-8" alt="Fact1" :src="fact1_logo" />
    <span class="text-sm text-neutral-600 dark:text-white leading-2">Formula 1 &bull; {{ $t('global.season') }} 2025</span>
  </div>
  <div class="bg-gradient-to-r from-red-500 to-red-700 shadow-md flex justify-center z-20">
    <div class="w-full max-w-3xl flex items-center justify-between py-3">
      <NavigationDesktop :items="navigationItems" />
      <SimpleDialog className="w-64 p-8" overlay end>
        <div class="flex flex-col gap-8">
          <div class="font-bold text-xl">Settings</div>
          <div class="flex flex-col gap-5 items-end">
            <TextSeparator :label="$t('global.language')" end />
            <LanguageSwitcher v-model="currentLocale" :languages="languages" />
          </div>
          <div class="flex flex-col gap-5">
            <TextSeparator :label="$t('global.units')" end />
            <ToggleButton v-model="currentUnit" :options="options" />
          </div>
        </div>
        <template #activator="{ toggle }">
          <Button class="text-white hover:bg-transparent" type="button" icon="pi pi-cog" variant="text"
                  @click="toggle"
                  size="large" rounded />
        </template>
      </SimpleDialog>
    </div>
  </div>
</template>
