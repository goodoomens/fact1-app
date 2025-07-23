<script setup lang="ts">
import { defineModel, defineProps, Component } from 'vue'

type Route = {
  path: string,
  name: string,
  component: Component,
  label: string,
  icon: string,
}

const model = defineModel()

defineProps<{
  routes: Route[],
}>()
</script>

<template>
  <transition>
    <div class="bg-[rgba(255,255,255,0.8)] backdrop-blur-md absolute left-0 w-full">
      <div
          v-if="model"
          class="mx-auto max-w-3xl flex flex-col items-start w-full h-screen transition-all"
      >
        <template v-for="(route, idx) in routes" :key="route.name">
          <router-link
              class="text-md text-gray-900 font-medium px-8 py-5 flex items-center gap-5 w-full hover:bg-[rgba(0,0,0,0.2)]"
              :to="route.path" @click="model = !model"
          >
            <i :class="route.icon"/>
            {{ route.label }}
          </router-link>
          <hr v-if="idx < routes.length - 1" class="w-full border-gray-900"/>
        </template>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
