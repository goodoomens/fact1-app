<script setup lang="ts">
import { ref } from 'vue'

const dontShowDialogAgain = ref(false)
const dialogOpen = ref(JSON.parse(localStorage.getItem('dontShowDialogAgain') ?? 'true'))

const closeDialog = () => {
  if (dontShowDialogAgain.value) {
    localStorage.setItem('dontShowDialogAgain', String(!dontShowDialogAgain.value))
  }
  dialogOpen.value = false
}
</script>

<template>
  <div v-if="dialogOpen"
       class="absolute w-full h-full bg-[rgba(0,0,0,0.5)] dark:bg-[rgba(0,0,0,0.8)] shadow-lg z-50 p-6 flex justify-center items-center"
       @click="closeDialog"
       data-ident="overlay"
  >
    <div
      class="bg-white dark:bg-neutral-800 p-10 rounded-lg max-w-xl flex flex-col gap- outline-2 outline-white dark:outline-neutral-900 outline-offset-4"
      @click.stop>
      <div class="flex flex-col items-center gap-5">
        <div class="text-5xl text-center">🏎️💨</div>
        <h1 class="font-semibold text-center">{{ $t('initial.welcome') }}</h1>
        <p>{{ $t('initial.text') }}</p>
        <div class="w-full flex flex-col items-center gap-1">
          <div class="flex items-center gap-2 text-sm">
            <Checkbox v-model="dontShowDialogAgain" inputId="dontShowAgain" binary />
            <label class="select-none" for="dontShowAgain">{{ $t('initial.dontShowAgain') }}</label>
          </div>
          <Button class="w-full my-2" @click="closeDialog" data-ident="confirm-disclaimer-button">
            Keep pushing!
          </Button>
        </div>
        <hr class="w-full border-neutral-200" />
        <p class="text-xs text-neutral-400">{{ $t('initial.disclaimer') }}</p>
      </div>
    </div>
  </div>
</template>
