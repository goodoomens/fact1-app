<template>
  <div class="driver-card-item driver-position">
    {{ driverPosition }}
  </div>
</template>

<script>
export default {
  name: "DriverPosition",
  props: {
    driverPosition: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Fancy version */
/* .driver-position {
  font-size: 20rem;
  font-weight: 800;
  letter-spacing: -2rem;
  line-height: 1;
  color: var(--bg-color-body);

  position: absolute;
  top: 0;
  left: 0;
  transform: translate(2.5%, -5%) rotate(-10deg);

  transition: all var(--global-animation-speed) ease;
}

.driver-card:hover > .driver-position {
  transform: translateY(-10%) scale(1.4);
} */

/* Clean version */
.driver-position {
  width: 3rem;
  height: 3rem;
  border: 0.25rem solid var(--color-grey-shad2);
  border-radius: var(--global-border-radius-med);

  font-size: 1.4rem;
  font-weight: 800;
  color: var(--color-grey-shad2);

  /* position: absolute;
  bottom: 2rem;
  left: 2rem; */

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all var(--global-animation-speed) ease;
}
</style>
