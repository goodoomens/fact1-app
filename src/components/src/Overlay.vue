<script setup lang="ts">
const model = defineModel()
</script>

<template>
  <Transition mode="out-in">
    <div class="w-full h-full bg-[rgba(0,0,0,0.5)] absolute top-0 left-0 z-20" v-if="model" />
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>