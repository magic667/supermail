<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
};
</script>

<style>
.tab-bar {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  box-shadow: 0px -1px 1px rgba(100, 100, 100, 0.2);
}
</style>