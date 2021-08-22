<template>
  <div id="list">
    <div v-for="(item, index) in listData" :key="index" class="item">
      <div class="info">{{ item.info }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListView",
  props: {
    listData: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
};
</script>

<style scoped>
#list {
  background-color: #fff;
  font-size: 15px;
  color: #333;
}

#list .item {
  height: 44px;
  line-height: 44px;
  position: relative;
}

.item .info {
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  padding-left: 20px;
}
</style>
