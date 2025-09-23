<script setup lang="ts">
const model = defineModel()
</script>

<template>
  <div @click="model = !model"
       class="cursor-pointer relative flex items-center justify-center p-2 text-white"
       data-ident="menu-button"
  >
    <i
      class="pi pi-minus absolute transition-all duration-200 ease-in-out "
      style="font-size: 1.5rem"
      :class="model ? 'opacity-0' : '-translate-y-2'"
    />
    <i
      class="pi pi-minus transition-all duration-200 ease-in-out"
      style="font-size: 1.5rem"
      :class="model ? 'rotate-45' : ''"
    />
    <i
      class="pi pi-minus absolute transition-all duration-200 ease-in-out"
      style="font-size: 1.5rem"
      :class="model ? '-rotate-45' : ''"
    />
    <i
      class="pi pi-minus absolute transition-all duration-200 ease-in-out"
      style="font-size: 1.5rem"
      :class="model ? 'opacity-0' : 'translate-y-2'"
    />
  </div>
</template>
