<template>
  <div class="check-button">
    <input type="checkbox" :checked="isChecked" />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.check-button input {
  width: 20px;
  height: 20px;
}
</style>