<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUnits } from '@/composables'
import { NavigationDesktop, LanguageSwitcher, TextSeparator, SimpleDialog, ToggleButton } from '@/components'
import { navigationItems } from '@/router'
import { languages } from '@/layouts/shared/languages.ts'
import { useConfigStore } from '@/stores'
import { storeToRefs } from 'pinia'
import fact1_logo from '@/assets/fact1_logo_red.svg'

const { locale: currentLocale } = useI18n()
const { unit: currentUnit } = useUnits(currentLocale)

const configStore = useConfigStore()
const { currentYear, canGoNext, canGoPrev } = storeToRefs(configStore)

const options = ['km', 'miles']

const logoVisible = ref<boolean>(true)
onMounted(() => setTimeout(() => logoVisible.value = false, 8000))
</script>

<template>
  <TransitionGroup name="logo" tag="div">
    <div v-if="logoVisible" key="logo" class="flex flex-col items-center gap-3 p-8 w-full">
      <img class="h-8" alt="Fact1" :src="fact1_logo" />
      <span class="text-sm text-neutral-600 dark:text-white leading-2">{{ $t('global.appDescription')
        }}</span>
    </div>
    <div key="nav" class="bg-gradient-to-r from-red-500 to-red-700 shadow-md flex justify-center z-20 w-full">
      <div class="w-full max-w-3xl flex items-center justify-between py-3">
        <NavigationDesktop :items="navigationItems" />
        <div class="flex items-center gap-2">
          <div class="flex items-center text-white">
            <Button
              size="small"
              variant="text"
              icon="pi pi-chevron-left"
              class="text-white hover:bg-white/10"
              :disabled="!canGoPrev"
              @click="configStore.setYear(currentYear - 1)"
            />
            <span class="font-bold mx-2">{{ currentYear }}</span>
            <Button
              size="small"
              variant="text"
              icon="pi pi-chevron-right"
              class="text-white hover:bg-white/10"
              :disabled="!canGoNext"
              @click="configStore.setYear(currentYear + 1)"
            />
          </div>

          <Button @click="logoVisible = !logoVisible"
                  class="text-white hover:bg-transparent"
                  :icon="logoVisible ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"
                  variant="text"
                  size="large"
                  rounded
          />
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
              <Button @click="toggle"
                      class="text-white hover:bg-transparent"
                      icon="pi pi-cog"
                      variant="text"
                      size="large"
                      rounded
              />
            </template>
          </SimpleDialog>
        </div>
      </div>
    </div>
  </TransitionGroup>
</template>

<style>
.logo-move,
.logo-enter-active,
.logo-leave-active {
  transition: all 0.2s ease;
}

.logo-enter-from,
.logo-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}

.logo-leave-active {
  position: absolute;
}
</style>
