<template>
  <div class="feature">
    <a href="#">
      <img src="~assets/img/home/recommend_bg.png" alt="" />
    </a>
  </div>
</template>

<script>
export default {
  name: "FeatureView",
  props: {
    featureView: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.feature a img {
  width: 100%;
}
</style>