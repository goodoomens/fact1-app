const ClickOutside = {
  beforeMount(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  beforeUnmount(el) {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};

export default ClickOutside;
