import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createI18n } from 'vue-i18n'

import i18nConfig from '@/i18n'

import App from './App.vue'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import { definePreset } from '@primeuix/themes'

import { Button, ProgressBar, Tag, Checkbox } from 'primevue'

import './style.css'

const app = createApp(App)
const pinia = createPinia()

import { routes } from '@/router'

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{red.50}',
      100: '{red.100}',
      200: '{red.200}',
      300: '{red.300}',
      400: '{red.400}',
      500: '{red.500}',
      600: '{red.600}',
      700: '{red.700}',
      800: '{red.800}',
      900: '{red.900}',
      950: '{red.950}'
    }
  }
})

const i18n = createI18n(i18nConfig)

app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      cssLayer: {
        name: 'primevue',
        order: 'theme, base, primevue'
      }
    }
  },
  pt: {
    progressbar: {
      root: {
        class: 'rounded-none h-4'
      }
    },
    tag: {
      root: {
        class: 'text-xs py-[0.125rem]'
      }
    }
  },
  ripple: true
})
app.component('Button', Button)
app.component('ProgressBar', ProgressBar)
app.component('Tag', Tag)
app.component('Checkbox', Checkbox)
app.use(pinia)
app.use(router)
app.use(i18n)
app.mount('#app')
