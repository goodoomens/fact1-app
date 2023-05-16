<template>
  <div class="driver-points">
    {{ driverPoints }}
  </div>
</template>

<script>
export default {
  name: "DriverPoints",
  components: {},
  mixins: [],
  props: {
    driverPoints: {
      type: String,
      required: true,
    },
  },
  methods: {},
};
</script>

<style scoped>
.driver-points {
  font-size: var(--ds-font-size-points);
  font-weight: 600;
  line-height: 1;
  z-index: 1;
}
</style>
