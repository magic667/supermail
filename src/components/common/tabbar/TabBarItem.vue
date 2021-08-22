<template>
  <div class="tab-bar-item" @click="itemClick()">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="isActiveColor"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  data() {
    return {
      // isActive: true,
    };
  },
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "#ff5777",
    },
  },
  computed: {
    isActive() {
      // return this.$route.path.indexOf(this.path) !== -1;
      return this.$route.path.includes(this.path);
    },
    isActiveColor() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    },
  },
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  height: 49px;
  background-color: #f6f6f6;
  text-align: center;
  font-size: 14px;
}

.tab-bar-item img {
  width: 20px;
  height: 20px;
  margin-top: 5px;
  margin-bottom: 1px;
  vertical-align: middle;
}
</style>