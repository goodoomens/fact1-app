<template>
  <img class="circuit-img" :src="getImgPath" />
</template>

<script>
export default {
  name: "CircuitImage",
  props: {
    circuitId: {
      type: String,
      required: true,
    },
  },
  computed: {
    getImgPath() {
      return require(`@/assets/circuits/${this.circuitId}.png`);
    },
  },
};
</script>

<style scoped>
.circuit-img {
  width: 100%;
  object-fit: contain;
}
.dark .circuit-img {
  filter: invert(1);
}
</style>
