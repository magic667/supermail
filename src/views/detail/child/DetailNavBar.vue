<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <template #left>
        <div class="back" @click="goBack()">
          <img src="~assets/img/common/back.svg" alt="" />
        </div>
      </template>
      <template #center class="jkl">
        <div class="title">
          <div
            v-for="(item, index) in titles"
            :key="item.id"
            class="title-item"
            :class="{ active: index === currentIndex }"
            @click="titleClick(index)"
          >
            {{ item }}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  components: {
    NavBar,
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style>
.title {
  display: flex;
}

.title-item {
  flex: 1;
}

.active {
  color: #ff5777;
}

.back img {
  vertical-align: middle;
}
</style>