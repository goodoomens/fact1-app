<template>
  <div class="driver-img-container">
    <picture>
      <source :srcset="getDriverImgPath('avif')" type="image/avif" />
      <img
        loading="lazy"
        decoding="async"
        class="driver-img"
        :src="getDriverImgPath('png')"
        :alt="`Photo of ${driverName}`"
      />
    </picture>
  </div>
</template>

<script>
export default {
  name: "DriverImage",
  props: {
    driverCode: {
      type: String,
      required: true,
    },
    driverName: {
      type: String,
      required: true,
    },
  },
  methods: {
    getDriverImgPath(format) {
      return require(`@/assets/drivers/${this.driverCode.toLowerCase()}.${format}`);
    },
  },
};
</script>

<style scoped>
.driver-img {
  display: block;
  background-color: var(--bg-color-body);
  border-radius: var(--global-border-radius-med);
  width: 100%;
}
</style>
